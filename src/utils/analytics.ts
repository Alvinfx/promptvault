// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * Track custom events in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track prompt generation
 */
export const trackPromptGenerated = (
  templateName: string,
  category: string,
  aiModel: string
) => {
  trackEvent('prompt_generated', {
    template_name: templateName,
    category: category,
    ai_model: aiModel,
  });
};

/**
 * Track prompt saved to blockchain
 */
export const trackPromptSaved = (
  templateName: string,
  category: string,
  txHash?: string
) => {
  trackEvent('prompt_saved_blockchain', {
    template_name: templateName,
    category: category,
    transaction_hash: txHash,
  });
};

/**
 * Track wallet connection
 */
export const trackWalletConnected = (walletType: string) => {
  trackEvent('wallet_connected', {
    wallet_type: walletType,
  });
};

/**
 * Track page views (automatic via gtag config)
 */
export const trackPageView = (pagePath: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
  });
};
