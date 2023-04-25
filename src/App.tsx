import {Routes} from '@src/app/libs/routes/Routes';
import {MenuDrawer} from '@src/app/menu-drawer/menu-drawer';
import {Layout} from 'antd';
import {QueryClient, QueryClientProvider} from 'react-query';


export const App = () => {
   const queryClient = new QueryClient();

   const items = [
      {
         name: 'Users',
         path: '/users'
      },
      {
         name: 'Drivers',
         path: '/drivers'
      }
   ];

   return (
      <QueryClientProvider client={queryClient}>
         <Layout>
            <MenuDrawer menuItems={items}/>
            <Routes />
         </Layout>
      </QueryClientProvider>
   );
};