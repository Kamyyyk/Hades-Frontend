import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { authenticatedRoutes } from './authenticated-routes';
import { baseRoutes } from './base-routes';
import { unauthenticatedRoutes } from './unauthenticated-routes';

export const Routes: React.FC = (): JSX.Element => {
   const isLogged = true;
   const mainRoutes = isLogged ? authenticatedRoutes : unauthenticatedRoutes;
   const routes = createBrowserRouter([...mainRoutes, ...baseRoutes]);
   return <RouterProvider router={routes} />;
};
