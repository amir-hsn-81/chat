import React, { useState, useCallback } from 'react';
import { Chat, Message, User } from './types';
import { INITIAL_CHATS, USERS, CURRENT_USER_ID } from './constants';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import NewChatModal from './components/NewChatModal';

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const handleSelectChat = useCallback((chatId: number) => {
    setActiveChatId(chatId);
  }, []);
  
  const handleGoBack = useCallback(() => {
    setActiveChatId(null);
  }, []);

  const handleSendMessage = useCallback((chatId: number, message: Message) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );
      // Move the chat with the new message to the top
      const currentChatIndex = updatedChats.findIndex(c => c.id === chatId);
      if (currentChatIndex > 0) {
        const [currentChat] = updatedChats.splice(currentChatIndex, 1);
        updatedChats.unshift(currentChat);
      }
      return updatedChats;
    });
  }, []);
  
  const handleCreateChatWithCode = (code: string): { success: boolean, message: string } => {
    const targetUser = USERS.find(u => u.code.toLowerCase() === code.trim().toLowerCase());

    if (!targetUser) {
      return { success: false, message: "User not found with that code." };
    }

    if (targetUser.id === CURRENT_USER_ID) {
      return { success: false, message: "You can't start a chat with yourself." };
    }

    const chatExists = chats.find(c => c.user.id === targetUser.id);
    if (chatExists) {
      setActiveChatId(chatExists.id);
      setIsNewChatModalOpen(false);
      return { success: true, message: "Chat already exists. Opening it." };
    }

    const newChat: Chat = {
      id: Date.now(),
      user: targetUser,
      messages: [],
    };

    setChats(prevChats => [newChat, ...prevChats]);
    setIsNewChatModalOpen(false);
    setActiveChatId(newChat.id);
    return { success: true, message: "Chat created!" };
  };


  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (
    <div className="h-screen w-screen font-sans text-white antialiased">
      <div className="h-full w-full max-w-screen-xl mx-auto my-0 sm:my-4 bg-gray-800 sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="relative h-full w-full overflow-hidden">
            <div className={`transition-transform duration-300 ease-in-out h-full w-full ${activeChatId !== null ? '-translate-x-full' : 'translate-x-0'}`}>
                <ContactList
                    chats={chats}
                    activeChatId={activeChatId}
                    onSelectChat={handleSelectChat}
                    onNewChat={() => setIsNewChatModalOpen(true)}
                />
            </div>
            <div className={`absolute top-0 left-0 transition-transform duration-300 ease-in-out h-full w-full ${activeChatId !== null ? 'translate-x-0' : 'translate-x-full'}`}>
                 {activeChat && (
                    <ChatWindow 
                        chat={activeChat} 
                        onSendMessage={handleSendMessage}
                        onGoBack={handleGoBack}
                    />
                )}
            </div>
        </div>
      </div>
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleCreateChatWithCode}
      />
    </div>
  );
};

export default App;