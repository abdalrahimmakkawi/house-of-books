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
        content: `You are a professional audiobook narrator for "${bookTitle}" by ${bookAuthor}.

Generate EXACTLY 780 words of engaging narration. Count carefully.

Summary: ${bookSummary}
Key Insights: ${keyInsights.join(', ')}

Structure (must total 780 words):
- Introduction: 130 words - hook the listener
- Core Idea: 150 words - the main concept
- Key Insight 1: 120 words with example
- Key Insight 2: 120 words with example  
- Key Insight 3: 120 words with example
- Conclusion: 140 words - memorable closing

Warm, conversational tone. No headers. Plain text only.
EXACTLY 780 words.`
      }],
      max_tokens: 1500,
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