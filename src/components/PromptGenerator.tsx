import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { promptTemplates, PromptTemplate } from '../data/promptTemplates';
import { generatePrompt } from '../utils/promptEngine';
import { savePromptToIrys, estimateStorageCost } from '../services/irysService';
import { trackPromptGenerated, trackPromptSaved } from '../utils/analytics';
import { aiPlatforms } from '../utils/aiPlatforms';
import '../styles/PromptGenerator.css';

export default function PromptGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const categories = Array.from(new Set(promptTemplates.map(t => t.category)));
  const filteredTemplates = selectedCategory
    ? promptTemplates.filter(t => t.category === selectedCategory)
    : promptTemplates;

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setGeneratedPrompt('');
    const initialData: Record<string, string> = {};
    template.variables.forEach(v => {
      initialData[v.key] = v.defaultValue || '';
    });
    setFormData(initialData);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    const prompt = generatePrompt(selectedTemplate, formData);
    setGeneratedPrompt(prompt);
    
    // Track prompt generation
    trackPromptGenerated(
      selectedTemplate.name,
      selectedTemplate.category,
      selectedTemplate.aiModel
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenAI = async (platformUrl: string) => {
    // Copy prompt to clipboard first
    await navigator.clipboard.writeText(generatedPrompt);
    
    // Show copied notification
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Open AI platform in new tab
    window.open(platformUrl, '_blank');
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setGeneratedPrompt('');
    setFormData({});
    setSaveStatus('');
  };

  const handleSaveToIrys = async () => {
    if (!selectedTemplate || !generatedPrompt || !isConnected || !walletClient) {
      setSaveStatus('Please connect wallet and generate a prompt first');
      return;
    }

    setSaving(true);
    setSaveStatus('Saving to Irys Network...');

    try {
      const promptData = {
        promptId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        templateName: selectedTemplate.name,
        generatedPrompt,
        timestamp: Date.now(),
        category: selectedTemplate.category
      };

      const dataSize = new TextEncoder().encode(JSON.stringify(promptData)).length;
      const estimatedCost = estimateStorageCost(dataSize);
      
      console.log(`Estimated storage cost: ${estimatedCost} IRYS`);

      const result = await savePromptToIrys(promptData, walletClient);

      if (result.success) {
        setSaveStatus(`✓ Saved! Tx: ${result.txHash?.slice(0, 10)}...`);
        setTimeout(() => setSaveStatus(''), 5000);
        
        // Track successful blockchain save
        trackPromptSaved(
          selectedTemplate.name,
          selectedTemplate.category,
          result.txHash
        );
      } else {
        setSaveStatus(`Error: ${result.error}`);
      }
    } catch (error: any) {
      setSaveStatus(`Failed: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="prompt-generator">
      <header className="header">
        <h1>AI Prompt Generator</h1>
        <p className="subtitle">Create professional AI prompts for ChatGPT, Claude, Gemini, and more</p>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="category-filter">
            <h3>Categories</h3>
            <div className="dropdown-wrapper">
              <select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Templates</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>

          <div className="template-list">
            <h3>Templates</h3>
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template)}
              >
                <h4>{template.name}</h4>
                <p className="template-desc">{template.description}</p>
                <div className="template-meta">
                  <span className="ai-model">{template.aiModel}</span>
                  <span className="category-tag">{template.category}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="main-content">
          {!selectedTemplate ? (
            <div className="empty-state">
              <div className="empty-icon">✨</div>
              <h2>Select a Template to Get Started</h2>
              <p>Choose from our collection of professionally crafted prompt templates</p>
            </div>
          ) : (
            <>
              <div className="template-header">
                <div>
                  <h2>{selectedTemplate.name}</h2>
                  <p className="template-description">{selectedTemplate.description}</p>
                </div>
                <button className="reset-btn" onClick={handleReset}>
                  Reset
                </button>
              </div>

              <div className="form-section">
                <h3>Customize Your Prompt</h3>
                {selectedTemplate.variables.map(variable => (
                  <div key={variable.key} className="form-group">
                    <label htmlFor={variable.key}>
                      {variable.label}
                      {variable.required && <span className="required">*</span>}
                    </label>
                    {variable.description && (
                      <p className="field-description">{variable.description}</p>
                    )}
                    {variable.type === 'textarea' ? (
                      <textarea
                        id={variable.key}
                        value={formData[variable.key] || ''}
                        onChange={(e) => handleInputChange(variable.key, e.target.value)}
                        placeholder={variable.placeholder}
                        rows={4}
                      />
                    ) : variable.type === 'select' ? (
                      <select
                        id={variable.key}
                        value={formData[variable.key] || ''}
                        onChange={(e) => handleInputChange(variable.key, e.target.value)}
                      >
                        <option value="">Select an option</option>
                        {variable.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={variable.key}
                        type="text"
                        value={formData[variable.key] || ''}
                        onChange={(e) => handleInputChange(variable.key, e.target.value)}
                        placeholder={variable.placeholder}
                      />
                    )}
                  </div>
                ))}

                <button className="generate-btn" onClick={handleGenerate}>
                  Generate Prompt
                </button>
              </div>

              {generatedPrompt && (
                <div className="output-section">
                  <div className="output-header">
                    <h3>Generated Prompt</h3>
                    <div className="output-actions">
                      <button className="copy-btn" onClick={handleCopy}>
                        {copied ? '✓ Copied!' : 'Copy'}
                      </button>
                      <button 
                        className="save-btn" 
                        onClick={handleSaveToIrys}
                        disabled={saving || !isConnected}
                      >
                        {saving ? 'Saving...' : '💾 Save to Irys'}
                      </button>
                    </div>
                  </div>
                  {saveStatus && (
                    <div className={`save-status ${saveStatus.includes('✓') ? 'success' : 'error'}`}>
                      {saveStatus}
                    </div>
                  )}
                  <div className="output-content">
                    <pre>{generatedPrompt}</pre>
                  </div>
                  
                  <div className="ai-platforms-section">
                    <h4>Use this prompt with:</h4>
                    <div className="ai-platforms-grid">
                      {aiPlatforms.map(platform => (
                        <button
                          key={platform.id}
                          className="ai-platform-btn"
                          onClick={() => handleOpenAI(platform.url)}
                          style={{ borderColor: platform.color }}
                          title={`Copy prompt and open ${platform.name}`}
                        >
                          <span className="platform-icon">{platform.icon}</span>
                          <span className="platform-name">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="ai-platforms-hint">
                      Click any platform to copy your prompt and open it in a new tab
                    </p>
                  </div>
                  <div className="tips-section">
                    <h4>Tips for Best Results:</h4>
                    <ul>
                      {selectedTemplate.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
