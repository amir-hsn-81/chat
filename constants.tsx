import { User, Chat } from './types';

export const CURRENT_USER_ID = 1;

export const USERS: User[] = [
  { id: 1, name: 'You', avatarUrl: 'https://picsum.photos/seed/you/100/100', code: 'you#0001' },
  { id: 2, name: 'Alice', avatarUrl: 'https://picsum.photos/seed/alice/100/100', code: 'alice#0002' },
  { id: 3, name: 'Bob', avatarUrl: 'https://picsum.photos/seed/bob/100/100', code: 'bob#0003' },
  {
    id: 4,
    name: 'Gemini Bot',
    avatarUrl: 'https://picsum.photos/seed/gemini/100/100',
    code: 'gemini#0004',
    isBot: true
  },
  { id: 5, name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/charlie/100/100', code: 'charlie#0005' },
];

export const INITIAL_CHATS: Chat[] = [
  {
    id: 1,
    user: USERS[1], // Alice
    messages: [
      { id: 1, text: 'Hey, how are you?', senderId: 2, timestamp: '10:00 AM' },
      { id: 2, text: 'I am good, thanks! How about you?', senderId: 1, timestamp: '10:01 AM' },
      { id: 3, text: 'Doing great! Just working on a new project.', senderId: 2, timestamp: '10:02 AM' },
    ],
  },
  {
    id: 2,
    user: USERS[2], // Bob
    messages: [
      { id: 1, text: 'Did you see the game last night?', senderId: 3, timestamp: 'Yesterday' },
      { id: 2, text: 'Yeah, it was intense!', senderId: 1, timestamp: 'Yesterday' },
    ],
  },
  {
    id: 3,
    user: USERS[3], // Gemini Bot
    messages: [
        { id: 1, text: 'Hello! I am Gemini. You can ask me anything.', senderId: 4, timestamp: '9:00 AM' }
    ],
  },
    {
    id: 4,
    user: USERS[4], // Charlie
    messages: [
        { id: 1, text: 'Let\'s catch up later this week.', senderId: 5, timestamp: 'Mon' }
    ],
  },
];

export const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

export const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2 text-blue-400">
        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a.75.75 0 0 0-1.5 0v.25a.75.75 0 0 0 1.5 0v-.25ZM12.75 9a.75.75 0 0 1 .75.75v.25a.75.75 0 0 1-1.5 0v-.25a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        <path d="M12 1.5a.75.75 0 0 1 .75.75V3a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM12 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM7.05 5.032a.75.75 0 0 1 .53-1.282l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.591-.218v-.56Zm10.932 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06ZM3 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm17.25 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" />
        <path fillRule="evenodd" d="M12 6a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 12 6ZM9.75 7.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5H9.75ZM14.25 7.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5h-.01Z" clipRule="evenodd" />
        <path d="M3.283 14.043a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06Zm16.374 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06ZM12 18.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z" />
        <path fillRule="evenodd" d="M8.625 14.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm6.75 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        <path d="M5.5 16.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V17.25a.75.75 0 0 1 .75-.75Zm13.5 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V17.25a.75.75 0 0 1 .75-.75Z" />
    </svg>
);

export const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

export const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
);