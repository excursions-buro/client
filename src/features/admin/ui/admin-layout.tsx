import { useUserProfile } from '@/features/profile';
import { ROUTES } from '@/shared/model/routes';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export function AdminLayout({ children }: Props) {
  const { data: user, isLoading, isError } = useUserProfile();

  if (isLoading) return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;

  if (isError || user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}
