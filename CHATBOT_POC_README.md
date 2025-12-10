# Chatbot POC - Cross-Origin Communication Demo

## 🎯 Project Overview

This is a Proof of Concept demonstrating **cross-origin chatbot integration** using React, TypeScript, Vite, Tailwind CSS, and Shadcn UI. The chatbot is embedded via an `<iframe>` and communicates with the parent application using the `window.postMessage` API.

## 🏗️ Architecture

### Key Components

1. **Main Application** (The "Host")
   - Routes: `/`, `/pricing`, `/contact`
   - Contains the main layout with header, footer, and embedded iframe
   - Listens for messages from the chatbot iframe

2. **Chatbot Interface** (The "Guest")
   - Route: `/chatbot-ui`
   - Renders in isolation (no header/footer) inside the iframe
   - Sends commands to the parent window via `postMessage`

### Communication Flow

```
┌─────────────────────────────────────┐
│   Parent Window (Main App)          │
│   - Listens for postMessage events  │
│   - Handles navigation & form fill  │
│                                      │
│   ┌───────────────────────────────┐ │
│   │  <iframe src="/chatbot-ui">   │ │
│   │  - Chat Interface             │ │
│   │  - Sends commands to parent   │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 🚀 Getting Started

The project is already set up and running at `http://localhost:5173`

### Available Commands

Try these commands in the chatbot:
- `go to pricing` - Navigate to the pricing page
- `go to contact` - Navigate to the contact page
- `go to home` - Navigate to the home page
- `fill form` - Auto-fill the contact form with sample data
- `help` - Show all available commands

## 📁 Project Structure

```
src/
├── App.tsx                          # Router configuration
├── layouts/
│   └── MainLayout.tsx              # Main layout with iframe
├── pages/
│   ├── HomePage.tsx                # Landing page
│   ├── PricingPage.tsx             # Pricing plans
│   ├── ContactPage.tsx             # Contact form (with specific IDs)
│   └── ChatbotPage.tsx             # Isolated chat UI (for iframe)
├── hooks/
│   └── useWebsiteController.ts     # Message listener & handler
└── components/ui/                  # Shadcn UI components
```

## 🔑 Key Features

### 1. Cross-Origin Communication
- Uses `window.postMessage` for secure messaging
- Origin validation for security
- Supports navigation and form filling actions

### 2. Form Field IDs
The contact form uses specific IDs for chatbot integration:
- `name-input` - Name field
- `email-input` - Email field
- `message-input` - Message textarea

### 3. Chatbot Commands
The chatbot intelligently processes natural language commands:
- Navigation commands trigger route changes
- Form filling navigates to contact page and populates fields
- All actions are logged and confirmed

## 🎨 UI Components

Built with **Shadcn UI** components:
- Button
- Card
- Input
- Scroll Area
- Spinner
- Dialog
- Avatar
- Tooltip
- And more...

## 🔧 Technical Details

### Message Types

**Navigate Action:**
```typescript
{
  action: 'navigate',
  path: '/pricing'
}
```

**Fill Form Action:**
```typescript
{
  action: 'fillForm',
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  }
}
```

### Security Considerations

- Origin validation in `useWebsiteController`
- Same-origin policy enforced
- No sensitive data in postMessage

## 🧪 Testing the POC

1. Open `http://localhost:5173`
2. Look for the chatbot in the bottom-right corner
3. Try the commands listed above
4. Watch the app navigate and fill forms automatically

## 📝 Notes

- The chatbot UI is intentionally simple for POC purposes
- Mock AI logic - real implementation would connect to an AI service
- Form filling triggers React's onChange events properly
- Iframe is styled to appear as a floating widget

## 🚧 Future Enhancements

- Connect to real AI/LLM backend
- Add authentication & user sessions
- Implement conversation history
- Add more complex form interactions
- Deploy as separate domains for true cross-origin testing
