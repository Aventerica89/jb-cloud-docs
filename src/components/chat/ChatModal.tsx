import { useState, useEffect } from 'react';
import { AuthGate } from './AuthGate';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import type { ChatMessage, ChatResponse } from '../../types/chat';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try a simple request to see if session is valid
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'ping' }] }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch {
        // Not authenticated, that's fine
      } finally {
        setIsCheckingAuth(false);
      }
    };

    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      const data: ChatResponse = await response.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: `Error: ${data.error}` },
        ]);
        return;
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        toolCalls: data.toolResults,
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Network error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        <header className="chat-header">
          <div className="chat-header-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="chat-header-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            <h2>Docs Assistant</h2>
          </div>
          <button onClick={onClose} className="chat-close-btn" aria-label="Close chat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="chat-body">
          {isCheckingAuth ? (
            <div className="chat-loading">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : !isAuthenticated ? (
            <AuthGate onSuccess={() => setIsAuthenticated(true)} />
          ) : (
            <>
              <ChatMessages messages={messages} isLoading={isLoading} />
              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
