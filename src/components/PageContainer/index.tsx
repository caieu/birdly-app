import { ReactNode } from 'react';
import { NavBar } from '../NavBar';
import clsx from 'clsx';

interface PageContainerProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export const PageContainer = ({ children, fullWidth }: PageContainerProps) => (
  <div className="flex flex-col h-full">
    <NavBar />
    <div className="flex flex-col mx-auto bg-gray-900 flex-1 w-full">
      <div
        className={clsx(
          'mx-auto w-full h-full flex-1',
          !fullWidth && 'sm:max-w-3xl',
        )}
      >
        {children}
      </div>
    </div>
  </div>
);
