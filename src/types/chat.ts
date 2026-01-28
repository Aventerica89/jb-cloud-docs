// Chat message types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCall[];
  timestamp?: number;
}

export interface ToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
  result?: string;
  status: 'pending' | 'running' | 'success' | 'error';
}

// API request/response types
export interface ChatRequest {
  messages: ChatMessage[];
  sessionToken?: string;
}

export interface ChatResponse {
  message: string;
  toolResults?: ToolCall[];
  error?: string;
}

export interface AuthRequest {
  password: string;
}

export interface AuthResponse {
  token?: string;
  error?: string;
}

// Claude tool definitions
export interface ClaudeTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
      items?: { type: string };
    }>;
    required: string[];
  };
}

// GitHub file operations
export interface GitHubFile {
  path: string;
  content: string;
  sha?: string;
}

export interface GitHubCommit {
  message: string;
  files: GitHubFile[];
}

// Session/Auth
export interface SessionPayload {
  authenticated: boolean;
  exp?: number; // Set automatically by jose JWT library
}
