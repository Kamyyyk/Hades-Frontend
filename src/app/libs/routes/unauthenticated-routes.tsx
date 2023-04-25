import {Login} from '@src/app/login/login';
import {RouteObject} from 'react-router';

export const unauthenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <Login />
   }
];