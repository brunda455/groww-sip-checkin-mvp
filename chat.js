// Vercel serverless function: /api/chat
// Set GEMINI_API_KEY in your deployment environment. No key is exposed to the browser.
const ADVICE = /\b(which|best|recommend|suggest|pick|choose).{0,35}\b(fund|scheme|stock|investment)|\b(buy|sell).{0,25}\b(fund|scheme|stock)|\b(guarantee|guaranteed|promise|predict).{0,35}\b(return|profit|nav)|\b(risk[- ]free|sure[- ]shot)\b/i;
const SYSTEM = `You are SIP Check-in, a calm informational assistant for common SIP operations. This is not investment advice.
Allowed: explain general SIP terminology; explain common reasons an instalment/mandate may fail and neutral checks; explain the mechanics of reducing, pausing, skipping or stopping a SIP; explain that NAV and displayed values can fluctuate.
Never: name, rank, compare or recommend funds/schemes; tell a user to buy, sell, hold or redeem; personalize investment amounts; predict or promise returns; imply an outcome is guaranteed; create urgency or pressure.
Do not claim to see the user's Groww account or transaction. Never request PAN, phone, email, UPI ID, account number, OTP, password or screenshots.
Ground answers only in these general facts: SIPs invest at regular intervals; instalments buy units at the applicable NAV; values can fluctuate; mandate and scheme processes vary; account-specific status must be checked in the official app, bank, mandate provider or scheme documents.
If uncertain or asked for account-specific help, say so and direct the user to the relevant official support channel. Use simple language, support Hinglish if the user uses it, be neutral, concise, and do not tell the user whether to continue investing. End with 'Not investment advice.'`;
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const message = String(req.body?.message || '').slice(0,1200);
  if (!message.trim()) return res.status(400).json({error:'Message required'});
  if (ADVICE.test(message)) return res.status(200).json({answer:"I can’t recommend or compare funds, tell you to buy or sell, or predict or promise returns. Please consult a qualified, appropriately registered adviser or official product documents for investment decisions. I can explain general SIP mechanics. Not investment advice."});
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({error:'AI is not configured'});
  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(process.env.GEMINI_API_KEY);
    const response = await fetch(url, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      systemInstruction:{parts:[{text:SYSTEM}]},
      contents:[{role:'user',parts:[{text:message}]}],
      generationConfig:{temperature:0.2,maxOutputTokens:350}
    })});
    if (!response.ok) throw new Error('Model request failed');
    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();
    if (!answer) throw new Error('Empty model response');
    return res.status(200).json({answer});
  } catch (e) {
    return res.status(200).json({answer:"I’m not confident I can answer that safely. Please check the official app, bank, mandate provider or scheme documents, or contact their support. Not investment advice."});
  }
};