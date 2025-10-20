
import React from 'react';
import { MessageRole, ChatMessage } from '../types';

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

const ModelIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 17.27l-5.39 3.25a1 1 0 01-1.45-1.05l1.3-6.23-4.73-4.11a1 1 0 01.55-1.7h6.42l2.6-5.94a1 1 0 011.8 0l2.6 5.94h6.42a1 1 0 01.55 1.7l-4.73 4.11 1.3 6.23a1 1 0 01-1.45 1.05L12 17.27z" clipRule="evenodd" />
    </svg>
);


interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  return (
    <div className={`flex items-start gap-4 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red flex items-center justify-center">
          <ModelIcon className="w-6 h-6 text-brand-yellow" />
        </div>
      )}
      <div
        className={`max-w-xl lg:max-w-3xl p-4 rounded-xl shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-dark-secondary text-text-primary rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;
