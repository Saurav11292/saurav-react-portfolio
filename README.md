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
EmailJS sends the contact form message to your inbox. The EmailJS browser SDK does not require a separate mail server.

1. Create a free account at https://www.emailjs.com/
2. Add an Email Service and connect the inbox where you want to receive messages.
3. Create an Email Template. Set the template's **To Email** to your own inbox.
4. Use these template variables in the template:
   - `{{from_name}}`
   - `{{reply_to}}`
   - `{{subject}}`
   - `{{message}}`
5. Find your Service ID, Template ID and Public Key in the EmailJS dashboard.
6. Copy `.env.example` to `.env` and replace the placeholder values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

Only use the EmailJS **Public Key** in the Vite app. Never put an EmailJS private key, SMTP password, or other secret in a `VITE_` variable.

## 3. Run frontend and backend
```bash
npm run dev
```
- Frontend: http://localhost:5173
- API health check: http://localhost:4000/api/health
- Projects API: http://localhost:4000/api/projects

The Vite dev server proxies `/api` requests to the Express API.

## 4. Production build
```bash
npm run build
```
Vite outputs the frontend to `dist/`. The Express API is a separate Node service. Build the API with:

```bash
npm run server:build
```

## Important deployment notes
- Deploy the Vite `dist/` folder to a static host such as Netlify, Vercel or GitHub Pages.
- Deploy the Express API separately to a Node hosting provider if you need the API routes online.
- Set `CLIENT_ORIGIN` to your deployed frontend origin on the API host.
- Set the EmailJS `VITE_...` values in your frontend host's build environment, then rebuild.
- The contact form sends directly through EmailJS; the Express API currently provides a health endpoint and project data endpoint. It does not store messages or send email.
- Configure EmailJS allowed origins / domain restrictions in its dashboard when deploying.
- Update placeholder social URLs and add your real resume PDF at `public/Saurav_Verma_Resume.pdf`.
- Verify experience dates, titles, education details and contact information before publishing.

## Security / scope
No database, paid AI API, or AI token is used. Express includes Helmet, CORS and a basic API rate limit. EmailJS public identifiers are intended for browser use; protect your EmailJS account with its domain restrictions and dashboard limits.
