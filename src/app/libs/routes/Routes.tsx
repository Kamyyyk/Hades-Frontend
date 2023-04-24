import {useState} from 'react';
import { authenticatedRoutes } from '@src/app/libs/routes/authenticated-routes';
import { baseRoutes } from '@src/app/libs/routes/base-routes';
import { unauthenticatedRoutes } from '@src/app/libs/routes/unauthenticated-routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const Routes: React.FC = (): JSX.Element => {
   const [isLogged, setIsLogged] = useState<boolean>(true);

   const mainRoutes = isLogged ? authenticatedRoutes : unauthenticatedRoutes;
   const routes = createBrowserRouter([...mainRoutes, ...baseRoutes]);
   return <RouterProvider router={routes} />;
};
