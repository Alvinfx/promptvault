import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Free AI Prompt Generator - PromptCentral</h1>
          <p className="hero-subtitle">
            Generate professional AI prompts instantly with expert templates for ChatGPT, Claude, Gemini, Midjourney, Grok, and more. Free prompt engineering tool with multiple templates.
          </p>
          <div className="hero-actions">
            <Link to="/generator" className="cta-button">
              Start Generating Prompts
            </Link>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>Why Use Our AI Prompt Generator?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Multi-Model Support</h3>
            <p>Templates optimized for ChatGPT, Claude, Gemini, Grok, Midjourney, and more</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Generate professional prompts in seconds with our intelligent template system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Diverse Categories</h3>
            <p>From image generation to business analysis, sales, marketing, and more</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Expert Patterns</h3>
            <p>Built from 16+ AI mastery guides and proven prompt engineering techniques</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Customizable</h3>
            <p>Adjust variables and parameters to fit your specific needs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Business Ready</h3>
            <p>Professional templates for sales, marketing, and enterprise use cases</p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2>Available Categories</h2>
        <div className="categories-list">
          <div className="category-tag">Image Generation</div>
          <div className="category-tag">Video Creation</div>
          <div className="category-tag">AI Agents</div>
          <div className="category-tag">Business Analysis</div>
          <div className="category-tag">Sales & Marketing</div>
          <div className="category-tag">Content Creation</div>
          <div className="category-tag">Code Generation</div>
          <div className="category-tag">Research & Analysis</div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Create Better Prompts?</h2>
        <p>Join thousands of users creating professional AI prompts</p>
        <Link to="/generator" className="cta-button-secondary">
          Get Started Now
        </Link>
      </section>
    </div>
  );
}
