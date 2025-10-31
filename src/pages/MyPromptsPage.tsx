import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { getUserPrompts, PromptSaveData } from '../services/irysService';
import '../styles/MyPromptsPage.css';

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<PromptSaveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptSaveData | null>(null);
  const [copied, setCopied] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    loadPrompts();
  }, [address, walletClient]);

  const loadPrompts = async () => {
    if (!address || !walletClient) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userPrompts = await getUserPrompts(address, walletClient);
      setPrompts(userPrompts);
    } catch (error) {
      console.error('Error loading prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isConnected) {
    return (
      <div className="my-prompts-page">
        <div className="connect-wallet-message">
          <div className="message-icon">🔒</div>
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to view your saved prompts</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-prompts-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-prompts-page">
      <header className="page-header">
        <h1>My Saved Prompts</h1>
        <p className="subtitle">
          {prompts.length} prompt{prompts.length !== 1 ? 's' : ''} saved on Irys Network
        </p>
      </header>

      <div className="prompts-container">
        {prompts.length === 0 ? (
          <div className="empty-prompts">
            <div className="empty-icon">📝</div>
            <h2>No Saved Prompts Yet</h2>
            <p>Generate and save prompts to see them here</p>
          </div>
        ) : (
          <div className="prompts-grid">
            {prompts.map((prompt) => (
              <div
                key={prompt.promptId}
                className={`prompt-card ${selectedPrompt?.promptId === prompt.promptId ? 'selected' : ''}`}
                onClick={() => setSelectedPrompt(prompt)}
              >
                <div className="prompt-card-header">
                  <h3>{prompt.templateName}</h3>
                  <span className="category-badge">{prompt.category}</span>
                </div>
                <div className="prompt-preview">
                  {prompt.generatedPrompt.substring(0, 150)}...
                </div>
                <div className="prompt-meta">
                  <span className="timestamp">{formatDate(prompt.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPrompt && (
          <div className="prompt-detail-modal" onClick={() => setSelectedPrompt(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>{selectedPrompt.templateName}</h2>
                  <span className="category-badge">{selectedPrompt.category}</span>
                </div>
                <button className="close-btn" onClick={() => setSelectedPrompt(null)}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="prompt-full-text">
                  <pre>{selectedPrompt.generatedPrompt}</pre>
                </div>
                <div className="modal-actions">
                  <button 
                    className="copy-btn-modal" 
                    onClick={() => handleCopy(selectedPrompt.generatedPrompt)}
                  >
                    {copied ? '✓ Copied!' : 'Copy Prompt'}
                  </button>
                  <span className="saved-date">
                    Saved: {formatDate(selectedPrompt.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
