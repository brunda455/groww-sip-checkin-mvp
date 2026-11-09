# SIP Check-in MVP

An independent prototype based on the supplied Groww growth PM case study.

## What is included
- Public-facing chat-style SIP check-in.
- Neutral explanations for failed instalments, early value fluctuations, and reduce/pause/skip mechanics.
- Advice refusal guardrail.
- 20-case golden-set QA lab.
- Metrics dashboard with blank baseline values and the case-study guardrail targets.
- Optional Gemini 2.5 Flash serverless API (`api/chat.js`).

## Run locally
1. Install Node.js and the Vercel CLI.
2. In this folder run `npm install -g vercel`.
3. Run `vercel dev`.
4. Open the local URL printed by Vercel.

Without `GEMINI_API_KEY`, the interface runs in deterministic demo mode. To enable the model:
- Create a Gemini API key in Google's AI developer console.
- Add `GEMINI_API_KEY` to your local Vercel environment and deployment environment variables.
- Never put the key in `index.html` or any browser-side code.

## Deploy publicly
1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add `GEMINI_API_KEY` as a server-side environment variable if you want live Gemini responses.
4. Deploy. Vercel will serve `index.html` and the `/api/chat` serverless function.
5. Test the 20-case QA lab and manually review all outputs before sharing widely.

A deployment account and API key are required for a public AI-enabled deployment. This chat cannot publish to your hosting account.

## Important limitations
- This is a prototype, not a Groww product and not affiliated with Groww.
- It does not connect to user accounts, payment mandates, mutual-fund systems or live analytics.
- The browser-only demo responses use simple intent rules; they are not an AI model.
- The Gemini endpoint is optional and has not been exercised with your API key here.
- The advice filter is a prototype guardrail, not a complete financial compliance system. Add adversarial testing, human review, logging controls, privacy review, and jurisdiction-specific compliance before production.
- No user messages are persisted by this static interface.
- Never ask users to enter PAN, account numbers, OTPs, UPI IDs, phone numbers, passwords or screenshots.
- All screens should state: Not investment advice.
