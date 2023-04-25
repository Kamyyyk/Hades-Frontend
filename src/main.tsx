import {StrictMode} from 'react';
import { App } from '@src/App';
import ReactDOM from 'react-dom/client';
import '@src/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <StrictMode>
      <App />
   </StrictMode>,
);
