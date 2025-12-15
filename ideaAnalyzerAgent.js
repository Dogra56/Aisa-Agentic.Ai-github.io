import axios from "axios";

export async function ideaAnalyzerAgent(ideaInput) {

  // 🔒 Validation (Agentic behaviour)
  if (!ideaInput || ideaInput.length < 50) {
    return {
      error: "Startup idea is too short or unclear. Please provide a detailed description (minimum 50 characters)."
    };
  }

  const systemPrompt = `
You are “AISA – AI-Based Startup Idea & Business Analyzer”.

Your role is to act as a strategic startup analyst, not a generic content writer.

OUTPUT RULES (STRICT):
- Use clear section headings.
- Each section must contain AT LEAST 50 WORDS.
- Be honest, analytical, and realistic.
- No motivational or marketing language.

OUTPUT SECTIONS (IN THIS EXACT ORDER):

1. AI Idea Analyzer (Overview)
2. Problem–Solution Analysis
3. Target Audience Identification
4. Competition Research & Comparison
5. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
6. Risk & Drawback Evaluation
7. Unique Value Proposition (UVP) Check
8. OODA Mindset Analysis
   - Observe
   - Orient
   - Decide
   - Act

END WITH:
Founder Recommendation Summary (3–5 bullet points)
`;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3:latest",
        prompt: `${systemPrompt}\n\nUSER STARTUP IDEA:\n${ideaInput}`,
        stream: false
      }
    );

    return response.data.response;

  } catch (error) {
    return {
      error: "Ollama AI is not responding. Make sure Ollama is running."
    };
  }
}
