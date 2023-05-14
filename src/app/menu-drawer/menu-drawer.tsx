import {useState} from 'react';
import { RightCircleOutlined } from '@ant-design/icons';
import {TMenuName} from '@src/utils/heleprs/router-wrapper';
import {Button} from 'antd';
import {Drawer} from 'antd';
import {useNavigate} from 'react-router-dom';
import '@src/app/menu-drawer/menu-drawer.scss';

export interface IMenuItems {
   name: string;
   path: string;
}

export interface IMenuDrawer {
   menuItems: IMenuItems[];
   children: React.ReactNode
   menuName: TMenuName;
}

export const MenuDrawer: React.FC<IMenuDrawer> = ({menuItems, children, menuName}) => {

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
            <Button icon={<RightCircleOutlined />} className="drawer__button drawer__button--show-menu"  onClick={openDrawer}>
             Show menu
            </Button>
            <Drawer title={menuName} onClose={closeDrawer} open={isDrawerOpen} placement="left" footer={renderLogoutButtonComponent()}>
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