// make the spacing of the left and right side of the content to be the same
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
