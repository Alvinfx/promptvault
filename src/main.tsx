import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </WagmiProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
