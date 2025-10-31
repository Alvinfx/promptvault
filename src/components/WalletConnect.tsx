import { useConnect, useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { irysMainnet, irysTestnet } from '../config/irys';
import { trackWalletConnected } from '../utils/analytics';

export function WalletConnect() {
  const { connectors, connect } = useConnect();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const handleConnect = async (connector: (typeof connectors)[number]) => {
    try {
      await connect({ connector });
      
      // Track wallet connection
      trackWalletConnected(connector.name);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleSwitchToIrys = async (network: 'mainnet' | 'testnet' = 'mainnet') => {
    const targetChain = network === 'mainnet' ? irysMainnet : irysTestnet;
    
    try {
      await switchChain({ chainId: targetChain.id });
    } catch (error: unknown) {
      // If chain not added, add it first
      const err = error as { code?: number; message?: string };
      if (err?.code === 4902 || err?.message?.includes('Unrecognized chain')) {
        try {
          await (window as any).ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${targetChain.id.toString(16)}`,
              chainName: targetChain.name,
              nativeCurrency: targetChain.nativeCurrency,
              rpcUrls: [targetChain.rpcUrls.default.http[0]],
              blockExplorerUrls: [targetChain.blockExplorers.default.url],
            }],
          });
        } catch (addError) {
          console.error('Failed to add chain:', addError);
        }
      } else {
        console.error('Failed to switch chain:', error);
      }
    }
  };

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <div className="connect-options">
          <h3>Connect Wallet</h3>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              disabled={!connector.ready}
            >
              {connector.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="wallet-info">
          <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <p>Chain: {chain?.name || 'Unknown'}</p>
          
          {chain?.id !== irysMainnet.id && (
            <div className="switch-network">
              <button onClick={() => handleSwitchToIrys('mainnet')}>
                Switch to Irys Mainnet
              </button>
              <button onClick={() => handleSwitchToIrys('testnet')}>
                Switch to Irys Testnet
              </button>
            </div>
          )}
          
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
