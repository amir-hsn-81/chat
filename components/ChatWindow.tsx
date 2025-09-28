
import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '../types';
import ChatMessage from './ChatMessage';
import UserAvatar from './UserAvatar';
import { BotIcon, SendIcon } from '../constants';
import { getGeminiResponse } from '../services/geminiService';

interface ChatWindowProps {
  chat: Chat | undefined;
  onSendMessage: (chatId: number, message: Message) => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2 p-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-400">Gemini is typing...</span>
    </div>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isBotReplying, setIsBotReplying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      senderId: 1, // Current user ID
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onSendMessage(chat.id, userMessage);
    setNewMessage('');

    if (chat.user.isBot) {
      setIsBotReplying(true);
      const botResponseText = await getGeminiResponse(userMessage.text, chat.messages);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        senderId: chat.user.id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onSendMessage(chat.id, botMessage);
      setIsBotReplying(false);
    }
  };

  if (!chat) {
    return (
      <div className="w-2/3 flex-grow flex flex-col items-center justify-center bg-gray-800 text-gray-400">
        <h2 className="text-2xl">Select a chat to start messaging</h2>
      </div>
    );
  }

  return (
    <div className="w-2/3 flex-grow flex flex-col bg-gray-800">
      <header className="flex items-center p-4 bg-gray-900 border-b border-gray-700 shadow-md">
        <UserAvatar avatarUrl={chat.user.avatarUrl} name={chat.user.name} />
        <div className="ml-4">
            <div className="flex items-center">
                <h2 className="text-xl font-bold text-white">{chat.user.name}</h2>
                {chat.user.isBot && <BotIcon />}
            </div>
            <p className="text-sm text-green-400">Online</p>
        </div>
      </header>

      <main className="flex-grow p-6 overflow-y-auto">
        {chat.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} contact={chat.user} />
        ))}
         {isBotReplying && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-gray-900 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-700 text-white rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 active:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transform transition-all duration-200 ease-in-out hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatWindow;
