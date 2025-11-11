import { BrowserProvider } from 'ethers';
import { irysMainnet, irysTestnet } from '../config/irys';

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface PromptSaveData {
  promptId: string;
  templateName: string;
  generatedPrompt: string;
  timestamp: number;
  category: string;
}

/**
 * Save a generated prompt to Irys Network
 * @param data Prompt data to save
 * @param walletProvider Ethereum provider from wallet
 * @returns Transaction result with hash or error
 */
export async function savePromptToIrys(
  data: PromptSaveData,
  walletProvider: any
): Promise<TransactionResult> {
  try {
    if (!walletProvider) {
      return { success: false, error: 'Wallet not connected' };
    }

    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();

    // Verify we're on Irys network
    const isIrysNetwork = 
      network.chainId === BigInt(irysMainnet.id) || 
      network.chainId === BigInt(irysTestnet.id);

    if (!isIrysNetwork) {
      return { 
        success: false, 
        error: 'Please switch to Irys Network to save prompts' 
      };
    }

    // Store in localStorage for demo (replace with actual Irys storage)
    const userAddress = await signer.getAddress();
    const storageKey = `irys_prompts_${userAddress}`;
    const existingPrompts = localStorage.getItem(storageKey);
    const prompts: PromptSaveData[] = existingPrompts ? JSON.parse(existingPrompts) : [];
    
    prompts.push(data);
    localStorage.setItem(storageKey, JSON.stringify(prompts));

    // Simulate transaction hash
    const txHash = `0x${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;

    return {
      success: true,
      txHash
    };
  } catch (error: any) {
    console.error('Irys transaction error:', error);
    return {
      success: false,
      error: error.message || 'Transaction failed'
    };
  }
}

/**
 * Get user's saved prompts from Irys Network
 * @param userAddress User's wallet address
 * @param walletProvider Ethereum provider from wallet
 * @returns Array of saved prompts
 */
export async function getUserPrompts(
  userAddress: string,
  walletProvider: any
): Promise<PromptSaveData[]> {
  try {
    if (!walletProvider || !userAddress) {
      return [];
    }

    // Retrieve from localStorage for demo (replace with actual Irys API)
    const storageKey = `irys_prompts_${userAddress}`;
    const existingPrompts = localStorage.getItem(storageKey);
    
    if (!existingPrompts) {
      return [];
    }

    const prompts: PromptSaveData[] = JSON.parse(existingPrompts);
    // Sort by timestamp, newest first
    return prompts.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error fetching user prompts:', error);
    return [];
  }
}

/**
 * Estimate transaction cost for saving a prompt
 * @param dataSize Size of data in bytes
 * @returns Estimated cost in IRYS
 */
export function estimateStorageCost(dataSize: number): string {
  // Base cost: 0.0001 IRYS per KB
  const costPerKB = 0.0001;
  const sizeInKB = dataSize / 1024;
  const estimatedCost = Math.max(costPerKB, sizeInKB * costPerKB);
  return estimatedCost.toFixed(6);
}
