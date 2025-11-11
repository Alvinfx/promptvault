# PromptCentral

A professional AI Prompt Generator built with React, TypeScript, and Irys Network integration. Generate, customize, and save high-quality prompts for ChatGPT, Claude, Gemini, Midjourney, and more.

## Features

- 🎯 **Multi-Model Support**: Templates optimized for ChatGPT, Claude, Gemini, Grok, Midjourney, and more
- ⚡ **Instant Generation**: Create professional prompts in seconds
- 🎨 **Diverse Categories**: Image generation, video creation, AI agents, business analysis, sales, marketing, and more
- 📚 **Expert Patterns**: Built from 16+ AI mastery guides and proven prompt engineering techniques
- 🔧 **Customizable**: Adjust variables and parameters to fit your specific needs
- 💼 **Business Ready**: Professional templates for enterprise use cases
- 🔐 **Blockchain Integration**: Save prompts to Irys Network with wallet authentication
- 💾 **My Prompts**: View and manage all your saved prompts

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS Modules with custom design system
- **Routing**: React Router DOM
- **Blockchain**: Wagmi + Viem for Ethereum wallet integration
- **Network**: Irys Network (EVM-compatible blockchain)
- **Storage**: LocalStorage (demo) / Irys Network (production)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and wallet connection
│   ├── PromptGenerator.tsx  # Main prompt generation UI
│   └── WalletConnect.tsx    # Wallet connection logic
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   └── MyPromptsPage.tsx    # Saved prompts view
├── config/             # Configuration files
│   ├── irys.ts        # Irys network definitions
│   └── wagmi.ts       # Wagmi client setup
├── data/              # Static data
│   └── promptTemplates.ts   # Prompt template definitions
├── services/          # Business logic
│   └── irysService.ts # Irys blockchain integration
├── styles/            # CSS modules
└── utils/             # Utility functions
    └── promptEngine.ts # Prompt generation logic
```

## Wallet Integration

PromptCentral uses Wagmi and Viem for seamless wallet integration:

- **Supported Wallets**: MetaMask, WalletConnect, Coinbase Wallet
- **Networks**: Irys Mainnet (Chain ID: 1270), Irys Testnet (Chain ID: 1270)
- **Auto Chain Addition**: Automatically adds Irys network to MetaMask if not present

## Prompt Templates

Templates are organized by category:
- Image Generation (Midjourney, DALL-E, Stable Diffusion)
- Video Creation (Veo, Runway, Pika)
- AI Agents (Custom agents, automation)
- Business Analysis (Market research, competitor analysis)
- Sales & Marketing (Email campaigns, social media)
- Content Creation (Blog posts, articles)
- Code Generation (Programming assistance)
- Research & Analysis (Data analysis, insights)

## Saving Prompts

1. Connect your wallet (MetaMask recommended)
2. Switch to Irys Network (auto-prompted if needed)
3. Generate a prompt using any template
4. Click "Save to Irys" button
5. Confirm the transaction in your wallet
6. View saved prompts in "My Prompts" page

## Development

### Adding New Templates

Edit `src/data/promptTemplates.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Template Name',
  description: 'Template description',
  category: 'Category Name',
  aiModel: 'ChatGPT',
  template: 'Your prompt template with {variables}',
  variables: [
    {
      key: 'variableName',
      label: 'Variable Label',
      type: 'text',
      required: true,
      placeholder: 'Enter value...'
    }
  ],
  tips: ['Tip 1', 'Tip 2']
}
```

### Customizing Styles

Theme colors are defined in CSS files:
- Primary: `#0d5c63` (Teal)
- Secondary: `#0a4a4f` (Dark Teal)

## Deployment

### Build for Production

```bash
pnpm build
```

The `dist/` folder contains the production-ready static files.

### Deploy to Vercel

```bash
vercel deploy
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=dist
```

### Environment Variables

No environment variables required for basic functionality. For production Irys integration, you may need:

```env
VITE_IRYS_API_KEY=your_api_key
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with insights from 16+ Notion AI mastery guides
- Irys Network for decentralized storage
- Wagmi and Viem for Web3 integration
- React and TypeScript communities

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: support@promptcentral.com

---

Built with ❤️ using React, TypeScript, and Irys Network
