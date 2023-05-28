import {Login} from '@src/app/login/login';
import {IMenuItems, MenuDrawer} from '@src/app/menu-drawer/menu-drawer';
import {map} from 'lodash';
import {RouteObject} from 'react-router-dom';

export type TMenuName = 'Administrator' | 'Morgue worker' | 'Funeral House Worker'


export const routerWrapper = (routes: RouteObject[], menuItems: IMenuItems[], menuName: TMenuName, menuHidden = false): RouteObject[] => {
   return map(routes, (route: RouteObject) => {
      return {
         ...route,
         element: menuHidden ? <Login /> : <MenuDrawer menuItems={menuItems} menuName={menuName}>{route.element}</MenuDrawer>
      };
   });
};