import { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatModal } from './ChatModal';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export { ChatButton } from './ChatButton';
export { ChatModal } from './ChatModal';
export { ChatMessages } from './ChatMessages';
export { ChatInput } from './ChatInput';
export { AuthGate } from './AuthGate';
