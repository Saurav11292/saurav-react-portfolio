# Saurav Verma — React + TypeScript Portfolio

Responsive portfolio built with React, TypeScript and Vite, plus a small Express API and EmailJS contact form.

## Requirements
- Node.js 20 LTS recommended (18+ should work)
- npm

## 1. Install
Extract the ZIP, open the project folder in VS Code, then run:

```bash
npm install
```

## 2. Configure EmailJS
The contact form submits to the backend, which sends the message through EmailJS. EmailJS credentials stay on the server and are never included in the frontend bundle.

1. Create a free account at https://www.emailjs.com/
2. Add an Email Service and connect the inbox where you want to receive messages.
3. Create an Email Template. Set the template's **To Email** to your own inbox.
4. Use these template variables in the template:
   - `{{from_name}}`
   - `{{reply_to}}`
   - `{{subject}}`
   - `{{message}}`
5. Find your Service ID, Template ID, Public Key, and Private Key in the EmailJS dashboard.
6. Copy `.env.example` to `.env` and replace the placeholder values:

```env
EMAILJS_SERVICE_ID=service_xxxxx
EMAILJS_TEMPLATE_ID=template_xxxxx
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

Never put an EmailJS private key, SMTP password, or other secret in a `VITE_` variable.

## 3. Run frontend and backend
```bash
npm run dev
```
- Frontend: http://localhost:5173
- API health check: http://localhost:4000/api/health
- Projects API: http://localhost:4000/api/projects

The Vite dev server proxies `/api` requests to the Express API. The contact endpoint is `POST /api/contact`.

## 4. Production build
```bash
npm run build
```
Vite outputs the frontend to `dist/`. Build the local Express API with:

```bash
npm run server:build
```

## Important deployment notes
- Deploy the project to Vercel. The `api/contact.ts` function serves `POST /api/contact`; local development uses the Express API.
- In Vercel Project Settings → Environment Variables, set `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, and `CLIENT_ORIGIN` (for example, `https://saurav-react-portfolio.vercel.app`). Set them for Production, then redeploy.
- Automatic production deployment runs from `.github/workflows/deploy.yml` on every push to `main`. Add GitHub Actions repository secrets named `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Create the token in Vercel and get the organization and project IDs from `.vercel/project.json` after linking the project with `vercel link`. You can also start a deployment from the workflow's **Run workflow** button.
- Configure EmailJS template variables `from_name`, `reply_to`, `subject`, and `message`. Keep the template's **To Email** set to your inbox.
- The contact route validates input and applies basic per-instance throttling. Protect your EmailJS account with usage limits and monitor usage.
- Update placeholder social URLs and add your real resume PDF at `public/Saurav_Verma_Resume.pdf`.
- Verify experience dates, titles, education details and contact information before publishing.

## Security / scope
No database, paid AI API, or AI token is used. Express includes Helmet, CORS and API rate limits. EmailJS credentials are used by the backend only; never expose the private key in frontend code or a `VITE_` variable. Protect your EmailJS account with usage limits and monitor usage.
