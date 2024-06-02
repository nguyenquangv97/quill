'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const { data, isSuccess, isError, error } = trpc.authCallback.useQuery(
    undefined,
    { retry: true, retryDelay: 1000 }
  );
  /*
    The useEffect hook is used here to perform side effects, specifically to navigate to different routes based on the state of the authentication callback.

    In React, side effects are operations that can affect other components and can't be done during rendering, such as data fetching, subscriptions, or manually changing the DOM. React's functional components have no lifecycle methods, so hooks like useEffect are used instead.

    The warning you're seeing is because you're trying to perform a state update (via router.push) during the rendering of a different component. This is a violation of React's rules of hooks, which state that you should not perform side effects inside the main body of a function component (i.e., outside of useEffect or useLayoutEffect).

    By moving the router.push calls into a useEffect hook, you're ensuring that they're not called during the render phase of any component, but instead are scheduled to run after the render is committed to the screen. This way, you avoid the warning and ensure that your side effects are run at the appropriate time.

*/
  useEffect(() => {
    if (isSuccess && data.success) {
      router.push(origin ? `/${origin}` : '/dashboard');
    }
    if (isError) {
      if (error.data?.code === 'UNAUTHORIZED') {
        router.push(`/sign-in`);
      }
    }
  }, [isSuccess, isError, data?.success, error?.data?.code, origin, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};
export default AuthCallback;
