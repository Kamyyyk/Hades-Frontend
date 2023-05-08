import {Routes} from '@src/app/libs/routes/Routes';
import {Layout} from 'antd';
import {QueryClient, QueryClientProvider} from 'react-query';

export const App = () => {
   const queryClient = new QueryClient();
   return (
      <QueryClientProvider client={queryClient}>
         <Layout>
            <Routes />
         </Layout>
      </QueryClientProvider>
   );
};