import { useEffect, useRef } from 'react';
import type { ChatMessage, ToolCall } from '../../types/chat';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

function ToolIndicator({ toolCalls }: { toolCalls: ToolCall[] }) {
  return (
    <div className="tool-indicators">
      {toolCalls.map((tool) => (
        <div key={tool.id} className={`tool-indicator tool-indicator--${tool.status}`}>
          <span className="tool-name">{tool.name}</span>
          <span className="tool-status">
            {tool.status === 'running' && '...'}
            {tool.status === 'success' && ' done'}
            {tool.status === 'error' && ' failed'}
          </span>
        </div>
      ))}
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="message message--assistant">
      <div className="message-content">
        <p>Hi! I'm the docs assistant. I can help you:</p>
        <ul>
          <li>Explore and search documentation</li>
          <li>Create new documentation pages</li>
          <li>Update existing content</li>
          <li>Commit changes directly to GitHub</li>
        </ul>
        <p>What would you like to do?</p>
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="message message--assistant">
      <div className="message-content">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-messages">
      <WelcomeMessage />

      {messages.map((message, index) => (
        <div key={index} className={`message message--${message.role}`}>
          <div className="message-content">
            {message.content.split('\n').map((line, i) => (
              <p key={i}>{line || '\u00A0'}</p>
            ))}
          </div>
          {message.toolCalls && message.toolCalls.length > 0 && (
            <ToolIndicator toolCalls={message.toolCalls} />
          )}
        </div>
      ))}

      {isLoading && <LoadingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}
