import { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaTrash, FaTimes } from "react-icons/fa";
// import "./styles/ChatBot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { text: "What are your core cybersecurity skills? 🔒", query: "What are your core cybersecurity skills?" },
  { text: "Tell me about your RHB Bank internship. 💻", query: "Tell me about your internship at RHB Bank." },
  { text: "What studies did you do at KSHRD? 🎓", query: "What IT specialization studies did you do at Korea Software HRD Center (KSHRD)?" },
  { text: "How can I contact you? ✉️", query: "How can I contact you? What are your social links?" }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize and load chat history from sessionStorage
  useEffect(() => {
    const savedChat = sessionStorage.getItem("portfolio_chat_history");
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch {
        initializeDefaultMessage();
      }
    } else {
      initializeDefaultMessage();
    }
  }, []);

  const initializeDefaultMessage = () => {
    const initial: Message[] = [
      {
        role: "assistant",
        content: "Hi there! 👋 I am Vanhong's AI Assistant. Ask me anything about Vanhong's cybersecurity background, his digital banking projects, or his professional technical skills!"
      }
    ];
    setMessages(initial);
    sessionStorage.setItem("portfolio_chat_history", JSON.stringify(initial));
  };

  // Scroll to bottom on message change or window toggle
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const saveHistory = (updated: Message[]) => {
    setMessages(updated);
    sessionStorage.setItem("portfolio_chat_history", JSON.stringify(updated));
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInputValue("");
    }

    const updatedMessages: Message[] = [...messages, { role: "user", content: text }];
    saveHistory(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();

      if (typeof data.text !== "string" || !data.text.trim()) {
        throw new Error(data.error || "Chat response was empty");
      }

      const reply: Message = { role: "assistant", content: data.text };
      saveHistory([...updatedMessages, reply]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I am having trouble connecting to my brain right now. Please try again in a bit!"
      };
      saveHistory([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear chat history?")) {
      initializeDefaultMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Trigger Button */}
      <button
        className={`chatbot-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        data-cursor="disable"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <FaRobot />
              </div>
              <div>
                <h4>Vanhong's AI</h4>
                <p>Online Assistant</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button onClick={clearChat} title="Clear history" aria-label="Clear chat history" data-cursor="disable">
                <FaTrash />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close" aria-label="Close chat window" data-cursor="disable">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg-row ${msg.role}`}>
                <div className="chatbot-msg-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-msg-row assistant">
                <div className="chatbot-msg-bubble typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug.query)}
                  className="suggestion-chip"
                  data-cursor="disable"
                >
                  {sug.text}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chatbot-input-form"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me something about Vanhong..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()} data-cursor="disable">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
