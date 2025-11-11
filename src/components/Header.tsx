import { Link, useLocation } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import '../styles/Header.css';

export default function Header() {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { theme, toggleTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrolledToBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollTop(scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img 
            src="https://assets-gen.codenut.dev/lib/7d9fa8c4-63d7-4dc5-b81f-6d95e9671909/Prompt Central Logo (5).png" 
            alt="PromptCentral Logo" 
            className="logo-image"
          />
          <span className="logo-text">PromptCentral</span>
        </Link>

        <nav className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/generator" 
            className={location.pathname === '/generator' ? 'nav-link active' : 'nav-link'}
          >
            Generator
          </Link>
          <Link 
            to="/my-prompts" 
            className={location.pathname === '/my-prompts' ? 'nav-link active' : 'nav-link'}
          >
            My Prompts
          </Link>
        </nav>

        <div className="wallet-section">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {isConnected && address ? (
            <div className="wallet-connected">
              <span className="wallet-address">{formatAddress(address)}</span>
              <button onClick={() => disconnect()} className="disconnect-btn">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={handleConnect} className="connect-btn">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
    
    <button 
      className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
    </>
  );
}
