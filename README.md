# 🤖 Ahsan GPT

A modern, intelligent AI chat assistant built with React, TypeScript, and Google's Gemini AI. Features real-time conversations, multiple AI modes, Firebase authentication, and a beautiful dark-themed UI.

![Ahsan GPT](public/AhsanGPT.png)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Chat** - Powered by Google Gemini 2.5 Flash
- **Multiple AI Modes** - Creative, Balanced, and Precise conversation styles
- **Smart Suggestions** - AI-generated follow-up questions
- **Conversation History** - Save and manage multiple chat sessions
- **Real-time Streaming** - Live AI responses with typing indicators

### 🔐 Authentication
- **Firebase Auth** - Secure user authentication
- **Google OAuth** - One-click sign-in with Google
- **Email/Password** - Traditional authentication method
- **Protected Routes** - Secure access to chat features

### 🎨 User Interface
- **Modern Dark Theme** - Eye-friendly design with glassmorphism effects
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered transitions
- **Markdown Support** - Rich text formatting in messages
- **Collapsible Sidebar** - Conversation management panel

### 🛡️ Security & Performance
- **Rate Limiting** - Prevents API abuse
- **Input Sanitization** - XSS protection
- **Code Splitting** - Optimized bundle sizes
- **Error Boundaries** - Graceful error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd AhsanGPT-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Gemini API
VITE_LLM_API_KEY=your_gemini_api_key

# Optional: Supabase (if using)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:5173`

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication → Sign-in methods:
   - Email/Password
   - Google
3. Enable Firestore Database
4. Copy your Firebase config to `.env`

### Google Gemini API

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env` as `VITE_LLM_API_KEY`

### Google OAuth for Production

See [GOOGLE_OAUTH_FIX.md](GOOGLE_OAUTH_FIX.md) for detailed setup instructions.

**Quick setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials → OAuth 2.0 Client ID
3. Add Authorized JavaScript origins:
   - `http://localhost:5173`
   - `https://yourdomain.vercel.app`
4. Add Authorized redirect URIs:
   - `http://localhost:5173/auth/callback`
   - `https://yourdomain.vercel.app/auth/callback`
   - `https://yourdomain.vercel.app/__/auth/handler`

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env`

4. **Important:** The `vercel.json` file is already configured for SPA routing

## 🏗️ Project Structure

```
src/
├── components/
│   ├── chat/              # Chat UI components
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── ModeSelector.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SuggestedReplies.tsx
│   │   └── WelcomeScreen.tsx
│   ├── ui/                # Reusable UI components (Radix UI)
│   └── ErrorBoundary.tsx
├── hooks/
│   ├── useAuth.ts         # Authentication hook
│   ├── useChat.ts         # Chat state management
│   └── useLLM.ts          # LLM integration
├── integrations/
│   ├── firebase/          # Firebase config & auth
│   ├── llm/               # Gemini AI integration
│   └── supabase/          # Supabase (optional)
├── lib/
│   ├── ai-utils.ts        # AI helper functions
│   ├── rate-limiter.ts    # Rate limiting
│   └── utils.ts           # Utility functions
├── pages/
│   ├── Auth.tsx           # Login/Signup page
│   ├── AuthCallback.tsx   # OAuth redirect handler
│   ├── Index.tsx          # Main chat interface
│   ├── Docs.tsx           # Documentation
│   ├── Privacy.tsx        # Privacy policy
│   ├── Terms.tsx          # Terms of service
│   └── NotFound.tsx       # 404 page
├── types/
│   └── chat.ts            # TypeScript types
├── App.tsx                # Root component
└── main.tsx               # Entry point
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components

### Backend & Services
- **Firebase Auth** - User authentication
- **Firestore** - Database (optional)
- **Google Gemini AI** - Language model
- **Supabase** - Alternative backend (optional)

### State Management
- **React Query** - Server state
- **React Hooks** - Local state

### UI Components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **React Markdown** - Markdown rendering
- **CMDK** - Command palette

## 🔑 Key Features Explained

### AI Modes

**Creative Mode**
- Temperature: 0.9
- Best for: Brainstorming, storytelling, creative writing

**Balanced Mode** (Default)
- Temperature: 0.7
- Best for: General conversations, Q&A

**Precise Mode**
- Temperature: 0.3
- Best for: Technical questions, factual information

### Conversation Management

- **Auto-save** - Conversations saved to localStorage
- **Multiple chats** - Switch between conversations
- **Delete conversations** - Remove unwanted chats
- **Persistent history** - Survives page refreshes

### Security Features

- **Rate Limiting** - 10 messages per minute
- **Input Sanitization** - Max 10,000 characters
- **Protected Routes** - Auth required for chat
- **XSS Prevention** - Sanitized user inputs

## 🐛 Troubleshooting

### Google OAuth 404 Error on Vercel
See [GOOGLE_OAUTH_FIX.md](GOOGLE_OAUTH_FIX.md) for complete solution.

**Quick fix:**
- Ensure `vercel.json` exists with SPA rewrites
- Add `/auth/callback` to Google Console redirect URIs

### Firebase Auth Not Working
- Check Firebase config in `.env`
- Verify Firebase project has Auth enabled
- Check browser console for errors

### Gemini API Errors
- Verify API key is correct
- Check API quota in Google AI Studio
- Ensure `VITE_LLM_API_KEY` is set

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

## 📚 Documentation

- [Firebase Setup Guide](docs/FIREBASE_SETUP.md)
- [Firebase Implementation](docs/FIREBASE_IMPLEMENTATION.md)
- [Firebase Checklist](docs/FIREBASE_CHECKLIST.md)
- [Google OAuth Fix](GOOGLE_OAUTH_FIX.md)
- [Security Enhancements](docs/SECURITY_AI_ENHANCEMENTS.md)

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - AI model
- [Firebase](https://firebase.google.com/) - Authentication & database
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting

## 📞 Support

For issues and questions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review documentation in `/docs`
3. Check browser console for errors
4. Verify environment variables are set correctly

---

**Built with ❤️ using React + TypeScript + Vite + Firebase + Gemini AI**
