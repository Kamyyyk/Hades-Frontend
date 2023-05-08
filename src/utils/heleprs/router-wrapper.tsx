import {IMenuItems, MenuDrawer} from '@src/app/menu-drawer/menu-drawer';
import {map} from 'lodash';
import {RouteObject} from 'react-router-dom';


export const routerWrapper = (routes: RouteObject[], menuItems: IMenuItems[]): RouteObject[] => {
   return map(routes, (route: RouteObject) => {
      return {
         ...route,
         element: <MenuDrawer menuItems={menuItems}>{route.element}</MenuDrawer>
      };
   });
};