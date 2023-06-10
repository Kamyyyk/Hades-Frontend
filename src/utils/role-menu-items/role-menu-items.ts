import {dictionary} from '@src/app/libs/locales/en';

export const ADMINISTRATOR_MENU_ITEMS = [
   {
      name: dictionary.menu.users,
      path: '/users'
   },
   {
      name: dictionary.menu.drivers,
      path: '/drivers'
   }
];

export const FUNERAL_MORGUE_WORKER_MENU_ITEMS = [
   {
      name: dictionary.menu.morgue,
      path: '/morgue'
   }
];

export const FUNERAL_HOME_EMPLOYEE_MENU_ITEMS = [
   {
      name: dictionary.menu.caravans,
      path: '/caravans'
   },
   {
      name: dictionary.menu.cemetery,
      path: '/cemetery'
   },
   {
      name: dictionary.menu.funeralItems,
      path: '/funeral-items'
   },
   {
      name: dictionary.menu.shipping,
      path: '/shipping'
   },
   {
      name: dictionary.menu.documentation,
      path: '/documentation'
   },
   {
      name: dictionary.menu.prepareFuneral,
      path: '/prepare-funeral'
   },
   {
      name: dictionary.menu.funeralList,
      path: '/funeral'
   }
];
