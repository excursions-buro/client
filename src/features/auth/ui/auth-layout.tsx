import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white p-8 rounded shadow'>
        <h1 className='text-2xl font-bold mb-6 text-center'>{title}</h1>
        {children}
      </div>
    </div>
  );
}
