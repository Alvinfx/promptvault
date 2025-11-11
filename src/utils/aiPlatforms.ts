export interface AIPlatform {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  supportsDirectPrompt: boolean;
}

export const aiPlatforms: AIPlatform[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com/',
    icon: '🤖',
    color: '#10a37f',
    supportsDirectPrompt: false
  },
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai/',
    icon: '🧠',
    color: '#cc785c',
    supportsDirectPrompt: false
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.google.com/',
    icon: '✨',
    color: '#4285f4',
    supportsDirectPrompt: false
  },
  {
    id: 'copilot',
    name: 'Copilot',
    url: 'https://copilot.microsoft.com/',
    icon: '💬',
    color: '#0078d4',
    supportsDirectPrompt: false
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    url: 'https://www.perplexity.ai/',
    icon: '🔍',
    color: '#20808d',
    supportsDirectPrompt: false
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    url: 'https://www.midjourney.com/',
    icon: '🎨',
    color: '#000000',
    supportsDirectPrompt: false
  },
  {
    id: 'grok',
    name: 'Grok',
    url: 'https://x.com/i/grok',
    icon: '⚡',
    color: '#1da1f2',
    supportsDirectPrompt: false
  }
];

export const openAIWithPrompt = (prompt: string) => {
  // Copy prompt to clipboard
  navigator.clipboard.writeText(prompt);
  
  // Open AI platform in new tab
  window.open(aiPlatforms[0].url, '_blank');
  
  return true;
};
