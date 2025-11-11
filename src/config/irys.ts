import { defineChain } from 'viem';

export const irysMainnet = defineChain({
  id: 1270,
  name: 'Irys',
  nativeCurrency: {
    decimals: 18,
    name: 'Irys',
    symbol: 'IRYS',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet-rpc.irys.xyz/v1/execution-rpc'],
    },
    public: {
      http: ['https://mainnet-rpc.irys.xyz/v1/execution-rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Irys Explorer',
      url: 'https://mainnet-explorer.irys.xyz',
    },
  },
});

export const irysTestnet = defineChain({
  id: 1270,
  name: 'Irys Testnet v1',
  nativeCurrency: {
    decimals: 18,
    name: 'Irys',
    symbol: 'IRYS',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.irys.xyz/v1/execution-rpc'],
    },
    public: {
      http: ['https://testnet-rpc.irys.xyz/v1/execution-rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Irys Testnet Explorer',
      url: 'https://testnet-explorer.irys.xyz',
    },
  },
  testnet: true,
});
