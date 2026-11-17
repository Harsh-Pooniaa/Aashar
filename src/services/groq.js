// Groq AI Integration using available high-capacity models:
// Primary: openai/gpt-oss-120b
// Secondary fallback: qwen/qwen3.8-27b
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "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";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are "Aashar Medical AI", the intelligent emergency triage & dispatch assistant for Aashar International (Elite Medical Response).

Your key capabilities & instructions:
1. Provide thoughtful, highly professional medical first-aid triage, symptom assessment, and health advice.
2. For severe emergency red flags (e.g., crushing chest pain, stroke FAST symptoms, acute trauma, uncontrolled bleeding, severe shortness of breath), instruct the patient calmly to trigger the red "🚨 Request Rapid Dispatch" button or call +91 98765 43210 immediately.
3. Suggest the right specialist when appropriate:
   - Dr. R. Sharma (Chief Medical Officer - Critical Care & Air Evacuation)
   - Dr. M. Gupta (Orthopedic & Reconstructive Surgeon)
   - Dr. Jyoti (Trauma & Critical Surgical Lead)
4. Format responses cleanly with markdown, bullet points, and step-by-step guidance so it is easy to read during stressful moments.
5. Remind the user that AI triage provides immediate clinical education and guidance, but in-person medical evaluation should be sought for critical injuries.`;

export async function askGroqAI(userPrompt, conversationHistory = []) {
  const modelsToTry = [
    "openai/gpt-oss-120b",
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-20b"
  ];

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-6).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    })),
    { role: "user", content: userPrompt }
  ];

  for (const model of modelsToTry) {
    try {
      const response = await fetch(GROQ_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.6,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Groq model ${model} failed:`, errText);
        continue; // Try the next available model
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim().length > 0) {
        return content;
      }
    } catch (e) {
      console.warn(`Error connecting to Groq with model ${model}:`, e);
    }
  }

  // Graceful conversational response if all network calls fail
  return fallbackResponse(userPrompt);
}

function fallbackResponse(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes("chest") || lower.includes("heart") || lower.includes("breath") || lower.includes("emergency") || lower.includes("stroke")) {
    return "🚨 **URGENT EMERGENCY ALERT**: Your reported symptoms may be critical! Please click the red **'🚨 Request Rapid Dispatch'** button at the top of the screen or call our 24/7 command center at **+91 98765 43210** immediately.\n\n• Sit upright and rest\n• Loosen tight clothing\n• Do not exert yourself while our response unit is mobilized.";
  }
  return `Thank you for reaching out to Aashar Medical Response. Our AI triage has logged: "${prompt}".\n\nFor specialized treatment, please consult with our Chief Medical Officer Dr. R. Sharma or our trauma leads in the booking section below.`;
}
