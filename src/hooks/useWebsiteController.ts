import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NavigateMessage {
  action: "navigate";
  path: string;
}

interface FillFormMessage {
  action: "fillForm";
  data: {
    name?: string;
    email?: string;
    message?: string;
  };
}

interface ChatbotResizeMessage {
  action: "chatbotResize";
  isMinimized: boolean;
}

type PostMessageData = NavigateMessage | FillFormMessage | ChatbotResizeMessage;

export const useWebsiteController = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent<PostMessageData>) => {
      // Validate origin - accept messages from chat widget (localhost:3000) or same origin
      const allowedOrigins = [window.location.origin, "http://localhost:3000"];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Unauthorized message origin:", event.origin);
        return;
      }

      const { action } = event.data;

      if (action === "navigate") {
        const { path } = event.data as NavigateMessage;
        navigate(path);
      } else if (action === "chatbotResize") {
        const { isMinimized } = event.data as ChatbotResizeMessage;
        const iframe = document.querySelector(
          'iframe[title="Chatbot Assistant"]'
        ) as HTMLIFrameElement;
        if (iframe) {
          if (isMinimized) {
            iframe.style.width = "90px";
            iframe.style.height = "90px";
          } else {
            iframe.style.width = "450px";
            iframe.style.height = "650px";
          }
        }
      } else if (action === "fillForm") {
        const { data } = event.data as FillFormMessage;

        // Fill form fields by ID
        if (data.name) {
          const nameInput = document.getElementById(
            "name-input"
          ) as HTMLInputElement;
          if (nameInput) {
            nameInput.value = data.name;
            // Trigger React's onChange event
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;
            nativeInputValueSetter?.call(nameInput, data.name);
            const ev = new Event("input", { bubbles: true });
            nameInput.dispatchEvent(ev);
          }
        }

        if (data.email) {
          const emailInput = document.getElementById(
            "email-input"
          ) as HTMLInputElement;
          if (emailInput) {
            emailInput.value = data.email;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;
            nativeInputValueSetter?.call(emailInput, data.email);
            const ev = new Event("input", { bubbles: true });
            emailInput.dispatchEvent(ev);
          }
        }

        if (data.message) {
          const messageInput = document.getElementById(
            "message-input"
          ) as HTMLTextAreaElement;
          if (messageInput) {
            messageInput.value = data.message;
            const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLTextAreaElement.prototype,
              "value"
            )?.set;
            nativeTextAreaValueSetter?.call(messageInput, data.message);
            const ev = new Event("input", { bubbles: true });
            messageInput.dispatchEvent(ev);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
};
