import { DriversView } from '@src/app/administrator/drivers-view/drivers-view';
import { UsersView } from '@src/app/administrator/users-view/users-view';
import {CaravansView} from '@src/app/funera-house-worker/caravans-view/caravans-view';
import {CemeteryView} from '@src/app/funera-house-worker/cemetary-view/cemetery-view';
import {DeceasedDocumentationView} from '@src/app/funera-house-worker/deceased-documentation-view/deceased-documentation-view';
import {
   FuneralHouseWorkerMainView
} from '@src/app/funera-house-worker/funeral-house-worker-main-view/funeral-house-worker-main-view';
import {FuneralItemsView} from '@src/app/funera-house-worker/funeral-items-view/funeral-items-view';
import {FuneralDetails} from '@src/app/funera-house-worker/funeral-view/details/funeral-details';
import {FuneralView} from '@src/app/funera-house-worker/funeral-view/funeral-view';
import {PrepareFuneralView} from '@src/app/funera-house-worker/prepare-funeral-view/prepare-funeral-view';
import {ShippingView} from '@src/app/funera-house-worker/shipping-view/shipping-view';
import {Login} from '@src/app/login/login';
import {MorgueView} from '@src/app/morgue-worker/morgue-view/morgue-view';
import {MorgueWorkerMainView} from '@src/app/morgue-worker/morgue-worker-main-view/morgue-worker-main-view';
import {routerWrapper} from '@src/utils/heleprs/router-wrapper';
import {
   ADMINISTRATOR_MENU_ITEMS,
   FUNERAL_HOME_EMPLOYEE_MENU_ITEMS,
   FUNERAL_MORGUE_WORKER_MENU_ITEMS
} from '@src/utils/role-menu-items/role-menu-items';
import { RouteObject } from 'react-router-dom';


export const administratorAuthenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <UsersView/>,
   },
   {
      path: '/users',
      element: <UsersView/>,
   },
   {
      path: '/drivers',
      element: <DriversView />,
   }
];

export const administratorRoutes = routerWrapper(administratorAuthenticatedRoutes, ADMINISTRATOR_MENU_ITEMS, 'Administrator');


export const morgueWorkerAuthenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <MorgueWorkerMainView/>
   },
   {
      path: 'morgue',
      element: <MorgueView />,
   },
];

export const morgueWorkerRoutes = routerWrapper(morgueWorkerAuthenticatedRoutes, FUNERAL_MORGUE_WORKER_MENU_ITEMS, 'Morgue worker');

export const funeralHouseWorkerAuthenticatedRoutes: RouteObject[] = [
   {
      path: '/',
      element: <FuneralHouseWorkerMainView/>,
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: 'caravans',
      element: <CaravansView />,
   },
   {
      path: 'cemetery',
      element: <CemeteryView />,
   },
   {
      path: 'shipping',
      element: <ShippingView/>,
   },
   {
      path: 'documentation',
      element: <DeceasedDocumentationView />,
   },
   {
      path: 'funeral-items',
      element: <FuneralItemsView />,
   },
   {
      path: 'prepare-funeral',
      element: <PrepareFuneralView />,
   },
   {
      path: 'funeral',
      element: <FuneralView />,
   },
   {
      path: 'funeral/:funeralId',
      element: <FuneralDetails/>
   }
];

export const funeralHouseWorkerRoutes = routerWrapper(funeralHouseWorkerAuthenticatedRoutes, FUNERAL_HOME_EMPLOYEE_MENU_ITEMS, 'Funeral House Worker');
