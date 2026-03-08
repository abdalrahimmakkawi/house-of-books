// Direct fetch to Groq API - no npm packages required

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama3-8b-8192';

export async function expandBookContent(
  bookTitle: string,
  bookAuthor: string,
  bookSummary: string,
  keyInsights: string[]
): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
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
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        max_tokens: 1000,
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
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
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{
          role: "user",
          content: `Generate a 200 word engaging introduction 
          for the book "${bookTitle}" by ${bookAuthor}.`
        }],
        max_tokens: 300,
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating narration:', error);
    return '';
  }
}

export async function generateAISummary(
  bookTitle: string,
  bookAuthor: string
): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{
          role: "user",
          content: `Give me a detailed summary of the book "${bookTitle}" by ${bookAuthor}. Cover main themes, key insights, and practical takeaways. Format with clear paragraphs.`
        }],
        max_tokens: 1000,
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return '';
  }
}