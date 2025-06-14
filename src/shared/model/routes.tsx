import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EXCURSIONS: '/excursions',
  EXCURSION: '/excursions/:excursionId',
  ADMIN: '/admin',
  ABOUT: '/about',
  CONTACTS: 'mailto:support@mskburo.ru',
  SETTINGS: '/profile/settings',
  ORDER: '/orders/order/:orderId',
  ORDERS: '/orders/:userId',
  TERMS: '/',
  PRIVACY: '/',
} as const;

export type PathParams = {
  [ROUTES.EXCURSION]: {
    excursionId: string;
  };
  [ROUTES.ORDER]: {
    orderId: string;
  };
  [ROUTES.ORDERS]: {
    userId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
