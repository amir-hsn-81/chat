import React, { useState } from 'react';
import { Chat } from '../types';
import UserAvatar from './UserAvatar';
import { BotIcon, PlusIcon, CopyIcon, USERS, CURRENT_USER_ID } from '../constants';

interface ContactListProps {
  chats: Chat[];
  activeChatId: number | null;
  onSelectChat: (chatId: number) => void;
  onNewChat: () => void;
}

const ContactList: React.FC<ContactListProps> = ({ chats, activeChatId, onSelectChat, onNewChat }) => {
  const [copied, setCopied] = useState(false);
  const currentUser = USERS.find(u => u.id === CURRENT_USER_ID);

  const handleCopyCode = () => {
    if (currentUser) {
      navigator.clipboard.writeText(currentUser.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      <header className="p-4 border-b border-gray-800 flex-shrink-0 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Chats</h1>
        <button
          onClick={onNewChat}
          className="p-2 rounded-full text-white hover:bg-gray-700 active:bg-gray-600 transition-colors duration-200"
          aria-label="Start new chat"
        >
          <PlusIcon />
        </button>
      </header>
      <main className="flex-grow overflow-y-auto">
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center p-4 cursor-pointer transition-all duration-200 ease-in-out ${
                activeChatId === chat.id
                  ? 'bg-blue-600/30'
                  : 'hover:bg-gray-800'
              }`}
            >
              <UserAvatar avatarUrl={chat.user.avatarUrl} name={chat.user.name} />
              <div className="ml-4 flex-grow overflow-hidden">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold text-white">{chat.user.name}</h2>
                    {chat.user.isBot && <BotIcon />}
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
      {currentUser && (
        <footer className="p-4 border-t border-gray-800 flex-shrink-0 flex items-center justify-between bg-gray-900/50">
          <div className="flex items-center">
            <UserAvatar avatarUrl={currentUser.avatarUrl} name={currentUser.name} size="sm" />
            <div className="ml-3">
              <h3 className="font-bold text-white">{currentUser.name}</h3>
              <p className="text-sm text-gray-400">{currentUser.code}</p>
            </div>
          </div>
          <button onClick={handleCopyCode} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors relative" aria-label="Copy your code">
            <CopyIcon />
            {copied && <span className="absolute -top-8 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded">Copied!</span>}
          </button>
        </footer>
      )}
    </div>
  );
};

export default ContactList;