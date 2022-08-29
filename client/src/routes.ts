import Admin from './pages/admin';
import Auth from './pages/auth';
import Device from './pages/device';
import Shop from './pages/shop';
import {
  ADMIN_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/constants';

interface IRoute {
  path: string;
  Component: any;
}

export const authRoutes: IRoute[] = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes: IRoute[] = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: Device,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
