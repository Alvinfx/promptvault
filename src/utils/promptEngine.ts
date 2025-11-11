import { PromptTemplate } from '../data/promptTemplates';

export function generatePrompt(
  template: PromptTemplate,
  formData: Record<string, string>
): string {
  let prompt = template.template;

  // Replace all variables in the template
  template.variables.forEach(variable => {
    const value = formData[variable.key] || '';
    const placeholder = `{{${variable.key}}}`;
    
    // Handle conditional blocks (e.g., {{#if variable}}...{{/if}})
    const conditionalRegex = new RegExp(
      `\\{\\{#if ${variable.key}\\}\\}([\\s\\S]*?)\\{\\{/if\\}\\}`,
      'g'
    );
    
    if (value) {
      // If value exists, replace conditional with content
      prompt = prompt.replace(conditionalRegex, '$1');
    } else {
      // If no value, remove the conditional block
      prompt = prompt.replace(conditionalRegex, '');
    }
    
    // Replace simple placeholders
    prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
  });

  // Clean up any remaining conditional syntax
  prompt = prompt.replace(/\{\{#if \w+\}\}/g, '');
  prompt = prompt.replace(/\{\{\/if\}\}/g, '');
  
  // Clean up extra whitespace
  prompt = prompt.replace(/\n{3,}/g, '\n\n');
  
  return prompt.trim();
}

export function validateFormData(
  template: PromptTemplate,
  formData: Record<string, string>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  template.variables.forEach(variable => {
    if (variable.required && !formData[variable.key]?.trim()) {
      errors.push(`${variable.label} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}
