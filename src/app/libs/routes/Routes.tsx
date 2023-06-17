import {FC, useEffect, useState} from 'react';
import {useAuthContext} from '@src/app/libs/routes/auth-provider';
import {
   administratorRoutes,
   funeralHouseWorkerRoutes,
   morgueWorkerRoutes
} from '@src/app/libs/routes/authenticated-routes';
import { baseRoutes } from '@src/app/libs/routes/base-routes';
import {unauthorizedRoutes} from '@src/app/libs/routes/unauthenticated-routes';
import {RouteObject} from 'react-router';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

export type TUserRole = 'ADMINISTRATOR' | 'FUNERAL_MORGUE_WORKER' | 'FUNERAL_HOME_EMPLOYEE' | 'NO_ROLE'


export const Routes: FC = (): JSX.Element => {

   const {currentRole, setCurrentRole} = useAuthContext();
   const [mainRoutes, setMainRoutes] = useState<RouteObject[]>([]);

   const localStorageIsLogged = localStorage.getItem('IS_LOGGED');
   const localStorageCurrentRole = localStorage.getItem('CURRENT_ROLE');

   useEffect(() => {
      switch (localStorageCurrentRole) {
      case 'ADMINISTRATOR':
         setCurrentRole('ADMINISTRATOR');
         setMainRoutes(administratorRoutes);
         break;
      case 'FUNERAL_HOME_EMPLOYEE':
         setMainRoutes(funeralHouseWorkerRoutes);
         setCurrentRole('FUNERAL_HOME_EMPLOYEE');
         break;
      case 'FUNERAL_MORGUE_WORKER':
         setMainRoutes(morgueWorkerRoutes);
         setCurrentRole('FUNERAL_MORGUE_WORKER');
      }
   }, [currentRole, mainRoutes]);

   useEffect(() => {
      if (localStorageIsLogged !== 'true' || localStorageCurrentRole === 'NO_ROLE') {
         // console.log('x')
         // redirect('/');
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
   }, [currentRole]);

   const routes = createBrowserRouter([...mainRoutes, ...baseRoutes]);
   return (
      <>
         <RouterProvider router={routes} />
      </>
   );
};
