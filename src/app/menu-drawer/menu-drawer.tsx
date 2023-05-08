import {useState} from 'react';
import {Drawer} from 'antd';
import '@src/app/menu-drawer/menu-drawer.scss';
import {useNavigate} from 'react-router-dom';

export interface IMenuItems {
   name: string;
   path: string;
}

export interface IMenuDrawer {
   menuItems: IMenuItems[];
   children: React.ReactNode
}

export const MenuDrawer: React.FC<IMenuDrawer> = ({menuItems, children}) => {

   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const navigate = useNavigate();
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
      <>
         <div className="drawer">
            <button className="drawer__button drawer__button--show-menu"  onClick={openDrawer}>
             Show menu
            </button>
            <Drawer title="Jakieś menu" onClose={closeDrawer} open={isDrawerOpen} placement="left" footer={renderLogoutButtonComponent()}>
               {menuItems.map((elem, index) => {
                  return (
                     <div key={index} className="drawer__menu__items">
                        {/*<Link to={elem.path}></Link>*/}
                        <p onClick={() => navigate(elem.path)} className="drawer__menu__items--text" key={index}>{elem.name}</p>
                     </div>
                  );
               })}
            </Drawer>
         </div>
         {children}
      </>
   );
};