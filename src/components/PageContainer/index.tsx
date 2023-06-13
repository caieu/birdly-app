import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => (
  <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 pt-16">
    <div className="max-w-3xl mx-auto">
      <div className="shadow overflow-hidden sm:rounded-md">{children}</div>
    </div>
  </div>
);
