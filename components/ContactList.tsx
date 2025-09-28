
import React from 'react';
import { Chat } from '../types';
import UserAvatar from './UserAvatar';
import { BotIcon } from '../constants';

interface ContactListProps {
  chats: Chat[];
  activeChatId: number | null;
  onSelectChat: (chatId: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ chats, activeChatId, onSelectChat }) => {
  return (
    <div className="w-1/3 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Chats</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
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
              <div className="ml-4 flex-grow">
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
      </div>
    </div>
  );
};

export default ContactList;
