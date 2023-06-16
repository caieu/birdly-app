import { ReactNode } from 'react';
import { NavBar } from '../NavBar';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => (
  <div className="flex h-full">
    <NavBar />
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 flex-1">
      <div className="max-w-3xl mx-auto h-full">
        <div className="shadow overflow-hidden sm:rounded-md h-full">
          {children}
        </div>
      </div>
    </div>
  </div>
);
