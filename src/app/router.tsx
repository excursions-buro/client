import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../shared/model/routes';
import { App } from './app';
import { ProtectedRoute, protectedLoader } from './protected-route';
import { Providers } from './providers';

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import('@/features/home/home.page'),
      },
      {
        path: ROUTES.EXCURSIONS,
        lazy: () => import('@/features/excursions-list/excursions-list.page'),
      },
      {
        path: ROUTES.EXCURSION,
        lazy: () => import('@/features/excursion/excursion.page'),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },

      {
        element: <ProtectedRoute />,
        loader: protectedLoader,
        children: [
          {
            path: ROUTES.SETTINGS,
            lazy: () => import('@/features/profile/settings.page'),
          },
          {
            path: ROUTES.ORDERS,
            lazy: () => import('@/features/profile/orders.page'),
          },
        ],
      },
    ],
  },
]);
