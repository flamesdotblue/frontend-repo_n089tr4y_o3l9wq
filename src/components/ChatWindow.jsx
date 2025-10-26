import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MessageBubble({ message }) {
  const isYou = message.sender === 'You';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex w-full ${isYou ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[72%] rounded-2xl p-3 shadow-sm ring-1 ${
        isYou
          ? 'bg-[#3FA4BB] text-white ring-cyan-300/50'
          : 'bg-white text-gray-800 ring-gray-200'
      }`}>
        {message.sender && message.sender !== 'You' && (
          <p className={`mb-1 text-[11px] ${isYou ? 'text-white/80' : 'text-gray-500'}`}>{message.sender}</p>
        )}
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`mt-1 text-[10px] ${isYou ? 'text-white/80' : 'text-gray-400'}`}>{message.time}</div>
      </div>
    </motion.div>
  );
}

export default function ChatWindow({ messages }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <MessageBubble key={idx} message={m} />
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
    </div>
  );
}
