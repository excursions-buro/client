import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EXCURSIONS: '/excursions',
  EXCURSION: '/excursions/:excursionId',
  ABOUT: '/about',
  SETTINGS: '/settings',
  ORDERS: '/orders',
} as const;

export type PathParams = {
  [ROUTES.EXCURSION]: {
    excursionId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
