
import React, { useState, useCallback } from 'react';
import { Chat, Message } from './types';
import { INITIAL_CHATS } from './constants';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<number | null>(3); // Default to Gemini Bot

  const handleSelectChat = useCallback((chatId: number) => {
    setActiveChatId(chatId);
  }, []);

  const handleSendMessage = useCallback((chatId: number, message: Message) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  }, []);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (
    <div className="flex h-screen w-screen font-sans text-white antialiased">
        <div className="flex h-full w-full max-w-screen-xl mx-auto my-4 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <ContactList
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
          />
          <ChatWindow chat={activeChat} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
