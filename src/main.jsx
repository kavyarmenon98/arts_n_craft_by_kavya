import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}> 
      <StrictMode >
        <App />
      </StrictMode>
    </Provider>
  </QueryClientProvider>
</GoogleOAuthProvider>
)
