import {UsersView} from '@src/app/administrator/users-view/users-view';
import { RouteObject } from 'react-router';

export const authenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <div></div>,
   },
   {
      path: '/users',
      element: <UsersView />
   }
];
