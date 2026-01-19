# Authorization System

A robust, full-stack authentication application built with Next.js 14, TypeScript, and MongoDB Atlas. This project features a modern Glassmorphism UI and handles the complete user lifecycle, including secure login, email verification, and password resets.

## Live Demo
Link: https://auth-fullstack-six.vercel.app

---

## Demo Credentials
Since this project uses Mailtrap for secure email sandboxing, you can use these pre-verified credentials to test the protected routes instantly:

* Email: guest@desert.com
* Password: password123

---

## Key Features

* Secure Auth: Implemented full Sign-Up, Login, and Logout flows using JWT and HTTP-only cookies.
* Smart Middleware: Custom route protection that prevents unauthenticated users from accessing protected paths while ensuring logged-in users are redirected away from auth pages.
* Sandbox Emailing: Integrated Nodemailer with Mailtrap to handle verification and password reset tokens safely.
* Custom UI: A Desert themed interface built with Tailwind CSS, featuring backdrop-blur effects and responsive design.
* Server-Side Logic: Utilizing Next.js API Routes and Server Actions for backend processing.

---

## Tech Stack

* Framework: Next.js 14 (App Router)
* Language: TypeScript
* Database: MongoDB Atlas (Mongoose)
* Styling: Tailwind CSS
* Deployment: Vercel

---

## Getting Started Locally

1. Clone the repository:
   git clone https://github.com/edgecutioninst/auth-fullstack.git

2. Install dependencies:
   npm install

3. Set up .env: 
   Create a .env file and add the following keys with your own credentials:
   `
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_secret_key
   DOMAIN=http://localhost:3000
   MAILTRAP_USER=your_mailtrap_user_id
   MAILTRAP_PASS=your_mailtrap_password
  `
4. Run Development Server:
   npm run dev

---

## Project Structure

* src/app/api: Backend logic and route handlers.
* src/app/profile: Protected user dashboard.
* src/middleware.ts: Security layer for route management.
* src/dbConfig: Database connection logic.
