import Groq from 'groq-sdk';

const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

export async function expandBookContent(
  bookTitle: string,
  bookAuthor: string,
  bookSummary: string,
  keyInsights: string[]
): Promise<string> {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{
        role: "user",
        content: `You are a professional audiobook narrator. 
        Generate EXACTLY 1700 words. Not more, not less. 
        1700 words at 0.80 speech rate = exactly 13 minutes.
        
        Book: "${bookTitle}" by ${bookAuthor}
        Summary: ${bookSummary}
        Key Insights: ${keyInsights.join(', ')}
        
        Structure:
        1. Introduction: 250 words
        2. Each insight: 200 words with examples (6 insights = 1200 words)
        3. Conclusion: 250 words
        Total: 1700 words EXACTLY
        
        Plain text only, no markdown.`
      }],
      max_tokens: 2800,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error expanding book content:', error);
    return '';
  }
}

export async function askBookQuestion(
  bookTitle: string,
  bookSummary: string,
  question: string,
  chatHistory: {role: string, content: string}[]
): Promise<string> {
  try {
    const filteredHistory = chatHistory.filter(m => m.content && m.content.trim() !== '');
    
    const messages = [
      {
        role: "system" as const,
        content: `You are an expert on the book "${bookTitle}". 
        Summary: ${bookSummary}. 
        Answer questions helpfully and conversationally.`
      },
      ...filteredHistory.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content
      })),
      { role: "user" as const, content: question }
    ];
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 1000,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error asking book question:', error);
    return '';
  }
}

export async function generateBookNarration(
  bookTitle: string,
  bookAuthor: string
): Promise<string> {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{
        role: "user",
        content: `Generate a 200 word engaging introduction 
        for the book "${bookTitle}" by ${bookAuthor}.`
      }],
      max_tokens: 300,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating narration:', error);
    return '';
  }
}