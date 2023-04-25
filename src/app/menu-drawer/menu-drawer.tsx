import {useState} from 'react';
import {Drawer} from 'antd';
import '@src/app/menu-drawer/menu-drawer.scss';

export interface IMenuItems {
   name: string;
   path: string;
}

export interface IMenuDrawer {
   menuItems: IMenuItems[];
}

export const MenuDrawer: React.FC<IMenuDrawer> = ({menuItems}) => {

   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

   const closeDrawer = () => {
      setIsDrawerOpen(false);
   };

   const openDrawer = () => {
      setIsDrawerOpen(true);
   };

   const renderLogoutButtonComponent = () => {
      return (
         <div className="drawer__button drawer__button--logout">
            Logout
         </div>
      );
   };

   return (
      <div className="drawer">
         <button className="drawer__button drawer__button--show-menu"  onClick={openDrawer}>
             Show menu
         </button>
         <Drawer title="Jakieś menu" onClose={closeDrawer} open={isDrawerOpen} placement="left" footer={renderLogoutButtonComponent()}>
            {menuItems.map((elem, index) => {
               return (
                  <div key={index} className="drawer__menu__items">
                     <p className="drawer__menu__items--text" key={index}>{elem.name}</p>
                  </div>
               );
            })}
         </Drawer>
      </div>
   );
};