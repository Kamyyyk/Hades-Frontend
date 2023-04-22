import {RouteObject} from 'react-router';
import {Login} from '../../login/login';

export const unauthenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <Login />
   }
];