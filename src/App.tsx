import {Routes} from '@src/app/libs/routes/Routes';
import {Layout} from 'antd';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
   const queryClient = new QueryClient();
   return (
      <QueryClientProvider client={queryClient}>
         <Layout>
            <ToastContainer />
            <Routes />
         </Layout>
      </QueryClientProvider>
   );
};