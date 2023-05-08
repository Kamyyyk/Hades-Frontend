import {useEffect, useState} from 'react';
import {
   administratorRoutes,
   funeralHouseWorkerRoutes,
   morgueWorkerRoutes
} from '@src/app/libs/routes/authenticated-routes';
import { baseRoutes } from '@src/app/libs/routes/base-routes';
import { unauthenticatedRoutes } from '@src/app/libs/routes/unauthenticated-routes';
import {RouteObject} from 'react-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



type TUserRole = 'ADMINISTRATOR' | 'FUNERAL_MORGUE_WORKER' | 'FUNERAL_HOME_EMPLOYEE' | 'NO_ROLE'

export const Routes: React.FC = (): JSX.Element => {
   const [isLogged, setIsLogged] = useState<boolean>(true);
   const [mainRoutes, setMainRoutes] = useState<RouteObject[]>([]);
   const [currentRole, setCurrentRole] = useState<TUserRole>('FUNERAL_HOME_EMPLOYEE');

   console.log(mainRoutes);

   if (!isLogged || currentRole === 'NO_ROLE') {
      setMainRoutes(unauthenticatedRoutes);
   }

   useEffect(() => {
      switch(currentRole) {
      case 'ADMINISTRATOR':
         setMainRoutes(administratorRoutes);
         break;
      case 'FUNERAL_MORGUE_WORKER':
         setMainRoutes(morgueWorkerRoutes);
         break;
      case 'FUNERAL_HOME_EMPLOYEE':
         setMainRoutes(funeralHouseWorkerRoutes);
         break;
      }
   }, [isLogged, currentRole]);

   const routes = createBrowserRouter([...mainRoutes, ...baseRoutes]);
   return (
      <>
         <RouterProvider router={routes} />
      </>
   );
};
