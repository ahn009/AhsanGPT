// AI-powered prompt enhancement utilities

export function enhancePrompt(input: string): string {
  const trimmed = input.trim();
  
  // Add context for vague queries
  if (trimmed.length < 10 && !trimmed.includes('?')) {
    return trimmed;
  }
  
  // Detect code-related queries and add helpful context
  const codeKeywords = ['code', 'function', 'bug', 'error', 'debug', 'implement', 'algorithm'];
  if (codeKeywords.some(kw => trimmed.toLowerCase().includes(kw))) {
    if (!trimmed.toLowerCase().includes('language') && !trimmed.toLowerCase().includes('in ')) {
      // Prompt is code-related but doesn't specify language
      return trimmed;
    }
  }
  
  return trimmed;
}

export function generateSuggestedReplies(lastMessage: string): string[] {
  const lower = lastMessage.toLowerCase();
  
  // Code-related suggestions
  if (lower.includes('code') || lower.includes('function') || lower.includes('implement')) {
    return [
      'Can you explain this in more detail?',
      'Show me an example',
      'What are the best practices?',
    ];
  }
  
  // Explanation-related suggestions
  if (lower.includes('how') || lower.includes('what') || lower.includes('why')) {
    return [
      'Can you give me an example?',
      'Tell me more',
      'What are the alternatives?',
    ];
  }
  
  // Error/problem-related suggestions
  if (lower.includes('error') || lower.includes('issue') || lower.includes('problem')) {
    return [
      'How do I fix this?',
      'What causes this?',
      'Show me a solution',
    ];
  }
  
  // Default suggestions
  return [
    'Tell me more',
    'Can you elaborate?',
    'What else should I know?',
  ];
}

export function detectIntent(input: string): 'question' | 'command' | 'conversation' {
  const trimmed = input.trim().toLowerCase();
  
  // Question detection
  if (trimmed.includes('?') || 
      trimmed.startsWith('how ') || 
      trimmed.startsWith('what ') || 
      trimmed.startsWith('why ') ||
      trimmed.startsWith('when ') ||
      trimmed.startsWith('where ') ||
      trimmed.startsWith('who ')) {
    return 'question';
  }
  
  // Command detection
  if (trimmed.startsWith('create ') ||
      trimmed.startsWith('generate ') ||
      trimmed.startsWith('write ') ||
      trimmed.startsWith('build ') ||
      trimmed.startsWith('make ') ||
      trimmed.startsWith('show ') ||
      trimmed.startsWith('explain ')) {
    return 'command';
  }
  
  return 'conversation';
}

export function getSmartPlaceholder(conversationLength: number): string {
  if (conversationLength === 0) {
    return 'Ask Ahsan GPT anything...';
  }
  
  const placeholders = [
    'Ask a follow-up question...',
    'Continue the conversation...',
    'What else would you like to know?',
  ];
  
  return placeholders[conversationLength % placeholders.length];
}
