import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { irysTestnet } from './irys';

export const config = createConfig({
  chains: [irysTestnet, mainnet],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID' 
    }),
    coinbaseWallet({ appName: 'Irys dApp' }),
  ],
  transports: {
    [irysTestnet.id]: http(),
    [mainnet.id]: http(),
  },
});
