import {FC, useEffect, useState} from 'react';
import {
   administratorRoutes,
   funeralHouseWorkerRoutes,
   morgueWorkerRoutes
} from '@src/app/libs/routes/authenticated-routes';
import { baseRoutes } from '@src/app/libs/routes/base-routes';
import {unauthorizedRoutes} from '@src/app/libs/routes/unauthenticated-routes';
import {RouteObject} from 'react-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

type TUserRole = 'ADMINISTRATOR' | 'FUNERAL_MORGUE_WORKER' | 'FUNERAL_HOME_EMPLOYEE' | 'NO_ROLE'

export const Routes: FC = (): JSX.Element => {
   const [mainRoutes, setMainRoutes] = useState<RouteObject[]>([]);
   const [currentRole, setCurrentRole] = useState<TUserRole>('NO_ROLE');

   const localStorageCurrentRole = localStorage.getItem('CURRENT_ROLE');
   const localStorageIsLogged = localStorage.getItem('IS_LOGGED');

   useEffect(() => {
      switch (localStorageCurrentRole) {
      case 'ADMINISTRATOR':
         setCurrentRole('ADMINISTRATOR');
         localStorage.setItem('IS_LOGGED', 'true');
         break;
      case 'FUNERAL_HOME_EMPLOYEE':
         setCurrentRole('FUNERAL_HOME_EMPLOYEE');
         localStorage.setItem('IS_LOGGED', 'true');
         break;
      case 'FUNERAL_MORGUE_WORKER':
         setCurrentRole('FUNERAL_MORGUE_WORKER');
         localStorage.setItem('IS_LOGGED', 'true');
      }
   }, [localStorageCurrentRole, mainRoutes]);

   useEffect(() => {
      if (localStorageIsLogged !== 'true' || currentRole === 'NO_ROLE') {
         setMainRoutes(unauthorizedRoutes);
      }
   }, [localStorageIsLogged, currentRole]);

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
   }, [localStorageIsLogged, currentRole]);

   const routes = createBrowserRouter([...mainRoutes, ...baseRoutes]);
   return (
      <>
         <RouterProvider router={routes} />
      </>
   );
};
