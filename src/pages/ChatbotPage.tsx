import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: 'Hello! I can help you navigate the website or fill forms. Try commands like "go to dashboard", "go to pricing", "go to contact", or "fill form".',
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Notify parent about minimize state changes
  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage(
        { action: "chatbotResize", isMinimized },
        window.location.origin
      );
    }
  }, [isMinimized]);

  const sendMessageToParent = (
    action: string,
    data?: Record<string, unknown>
  ) => {
    if (window.parent !== window) {
      window.parent.postMessage({ action, ...data }, window.location.origin);
    }
  };

  const processCommand = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase().trim();

    // Navigation commands
    if (lowerInput.includes("pricing") || lowerInput === "go to pricing") {
      sendMessageToParent("navigate", { path: "/pricing" });
      return "Navigating to pricing page...";
    }

    if (lowerInput.includes("contact") || lowerInput === "go to contact") {
      sendMessageToParent("navigate", { path: "/contact" });
      return "Navigating to contact page...";
    }

    if (
      lowerInput.includes("home") ||
      lowerInput === "go to home" ||
      lowerInput === "go home"
    ) {
      sendMessageToParent("navigate", { path: "/" });
      return "Navigating to home page...";
    }

    if (lowerInput.includes("dashboard") || lowerInput === "go to dashboard") {
      sendMessageToParent("navigate", { path: "/dashboard" });
      return "Navigating to dashboard...";
    }

    // Form filling command
    if (
      lowerInput.includes("fill form") ||
      lowerInput.includes("fill the form")
    ) {
      sendMessageToParent("navigate", { path: "/contact" });
      setTimeout(() => {
        sendMessageToParent("fillForm", {
          data: {
            name: "John Doe",
            email: "john.doe@example.com",
            message: "Hello! This message was auto-filled by the chatbot.",
          },
        });
      }, 500);
      return "Navigating to contact page and filling the form for you...";
    }

    // Help command
    if (lowerInput.includes("help") || lowerInput === "?") {
      return `Here are the commands I understand:
• "go to dashboard" - Navigate to dashboard page
• "go to pricing" - Navigate to pricing page
• "go to contact" - Navigate to contact page
• "go to home" - Navigate to home page
• "fill form" - Fill the contact form automatically`;
    }

    // Default response
    return `I'm not sure I understand that command. Try "go to pricing", "go to contact", or "fill form". Type "help" for more options.`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Process the command
    const response = processCommand(input);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 300);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-[380px] h-[500px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <h3 className="font-semibold">AI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMinimized(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div ref={scrollRef} className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-background rounded-b-lg">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
