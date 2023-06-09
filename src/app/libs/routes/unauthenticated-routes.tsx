import {Login} from '@src/app/login/login';
import {routerWrapper} from '@src/utils/hooks/router-wrapper';
import {ADMINISTRATOR_MENU_ITEMS} from '@src/utils/role-menu-items/role-menu-items';
import {RouteObject} from 'react-router';

export const unauthenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <Login />
   }
];

export const unauthorizedRoutes = routerWrapper(unauthenticatedRoutes, ADMINISTRATOR_MENU_ITEMS, 'Administrator', true);
