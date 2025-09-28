
import React from 'react';
import { Message, User } from '../types';
import { CURRENT_USER_ID } from '../constants';

interface ChatMessageProps {
  message: Message;
  contact: User;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, contact }) => {
  const isCurrentUser = message.senderId === CURRENT_USER_ID;

  return (
    <div className={`flex items-end mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col max-w-lg ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isCurrentUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-700 text-gray-200 rounded-bl-none'
          }`}
        >
          <p>{message.text}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {isCurrentUser ? 'You' : contact.name} · {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
