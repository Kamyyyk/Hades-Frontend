import {useState} from 'react';
import {Drawer} from 'antd';
import '@src/app/menu-drawer/menu-drawer.scss';

export const MainView: React.FC = () => {
   
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
            <p>Kostnica</p>
         </Drawer>
      </div>
   );
};