import {PrepareFuneralProvider} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {AuthProvider} from '@src/app/libs/routes/auth-provider';
import {Routes} from '@src/app/libs/routes/Routes';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
   const queryClient = new QueryClient();
   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <>
               <ToastContainer />
               <PrepareFuneralProvider>
                  <Routes />
               </PrepareFuneralProvider>
            </>
         </AuthProvider>
      </QueryClientProvider>
   );
};