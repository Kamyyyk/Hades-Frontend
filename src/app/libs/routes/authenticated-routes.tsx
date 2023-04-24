import { MainView } from '@src/app/main-view/main-view/main-view';
import { RouteObject } from 'react-router';

export const authenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <MainView />,
   },
];
