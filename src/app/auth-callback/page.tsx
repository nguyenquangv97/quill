'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const origin = searchParams.get('origin');
  const { data, isSuccess, isError, error } = trpc.authCallback.useQuery(
    // undefined,
    // { retry: true, retryDelay: 1000 }
  );

  useEffect(() => {
    if (isSuccess && data.success) {
      router.push('/dashboard');
    }
    if (isError) {
      if (error.data?.code === 'UNAUTHORIZED') {
        router.push(`/api/auth/login`);
      }
    }
  }, [isSuccess, isError, data?.success, error?.data?.code, router]);

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
export default Page;
