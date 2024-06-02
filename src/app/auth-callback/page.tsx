

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';
import AuthCallback from './AuthCallback';
const Page = () => {
  <Suspense>
    <AuthCallback />
  </Suspense>
};
export default Page;
