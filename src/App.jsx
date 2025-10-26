import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ChatsList from './components/ChatsList.jsx';
import ChatHeader from './components/ChatHeader.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import MessageInput from './components/MessageInput.jsx';

const initialConversations = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    lastMessage: 'Got your update — looks great!',
    time: '10:32 AM',
  },
  {
    id: 'c2',
    name: 'Mark Chen',
    lastMessage: 'Can we schedule a quick call tomorrow?',
    time: 'Yesterday',
  },
  {
    id: 'c3',
    name: 'Aisha Rahman',
    lastMessage: 'I pushed the changes to the branch.',
    time: 'Mon',
  },
  {
    id: 'c4',
    name: 'Diego Alvarez',
    lastMessage: 'Let me know when the dashboard is deployed.',
    time: 'Sun',
  },
  {
    id: 'c5',
    name: 'Priya Nair',
    lastMessage: 'Thanks for the quick turnaround!',
    time: 'Fri',
  },
  {
    id: 'c6',
    name: 'Alex Kim',
    lastMessage: 'Shared the slides in the channel.',
    time: 'Thu',
  },
];

const initialMessages = {
  c1: [
    { sender: 'Sarah Johnson', text: 'Hey! Just reviewed your latest build.', time: '10:30 AM' },
    { sender: 'You', text: 'Great! Any changes needed?', time: '10:31 AM' },
    { sender: 'Sarah Johnson', text: 'Only a minor tweak on the header spacing.', time: '10:31 AM' },
    { sender: 'You', text: 'Got it. I can adjust the padding and push.', time: '10:31 AM' },
    { sender: 'Sarah Johnson', text: 'Perfect. Also, can we rename the “Usage” tab to “Analytics”?', time: '10:32 AM' },
    { sender: 'You', text: 'Yes, I’ll make that change too.', time: '10:32 AM' },
    { sender: 'Sarah Johnson', text: 'Awesome — thanks! 🙌', time: '10:32 AM' },
    { sender: 'You', text: 'Should be live in ~10 minutes.', time: '10:33 AM' },
    { sender: 'Sarah Johnson', text: 'Got your update — looks great!', time: '10:35 AM' },
    { sender: 'You', text: 'Amazing. I’ll proceed with the next module.', time: '10:36 AM' },
  ],
};

function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [activeId, setActiveId] = useState('c1');
  const [search, setSearch] = useState('');

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) || conversations[0],
    [activeId, conversations]
  );
  const activeMessages = messages[activeConversation?.id] || [];

  function handleSend(text) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), { sender: 'You', text, time }],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? { ...c, lastMessage: text, time }
          : c
      )
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto grid max-w-6xl gap-4 md:gap-6 lg:grid-cols-[360px,1fr]"
      >
        {/* Left: Chats List */}
        <div className="rounded-2xl bg-white/80 shadow-sm ring-1 ring-gray-200 backdrop-blur">
          <div className="border-b border-gray-100 p-4">
            <h1 className="text-base font-semibold text-gray-900">Messages</h1>
            <p className="text-xs text-gray-500">Your recent conversations</p>
          </div>
          <ChatsList
            conversations={conversations}
            activeId={activeId}
            onSelect={setActiveId}
            search={search}
            onSearch={setSearch}
          />
        </div>

        {/* Right: Chat Window */}
        <div className="flex min-h-[60vh] flex-col rounded-2xl bg-white/80 shadow-sm ring-1 ring-gray-200 backdrop-blur">
          <div className="p-3 md:p-4 border-b border-gray-100">
            <ChatHeader title={activeConversation?.name || 'Conversation'} />
          </div>
          <div className="flex-1">
            <ChatWindow messages={activeMessages} />
          </div>
          <MessageInput onSend={handleSend} />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
