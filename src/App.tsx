import {Routes} from '@src/app/libs/routes/Routes';
import {Layout} from 'antd';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from '@src/app/libs/routes/auth-provider';
import {PrepareFuneralProvider} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';

export const App = () => {
   const queryClient = new QueryClient();
   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <Layout>
               <ToastContainer />
               <PrepareFuneralProvider>
                  <Routes />
               </PrepareFuneralProvider>
            </Layout>
         </AuthProvider>
      </QueryClientProvider>
   );
};