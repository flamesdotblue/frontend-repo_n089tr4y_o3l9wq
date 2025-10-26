import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function initialsFromName(name) {
  const parts = name.split(' ').filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

export default function ChatsList({ conversations, activeId, onSelect, search, onSearch }) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  }, [conversations, search]);

  return (
    <div className="flex h-full flex-col">
      <div className="relative p-4">
        <div className="flex items-center gap-2 rounded-2xl bg-white/70 shadow-sm ring-1 ring-gray-200 px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search conversations"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <AnimatePresence initial={false}>
          {filtered.map((chat) => {
            const isActive = chat.id === activeId;
            return (
              <motion.button
                key={chat.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                onClick={() => onSelect(chat.id)}
                className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left ring-1 transition shadow-sm ${
                  isActive ? 'bg-gray-100 ring-gray-200' : 'bg-white hover:bg-gray-50 ring-gray-200'
                }`}
              >
                <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-400 text-cyan-900 grid place-items-center font-semibold">
                  {chat.avatarUrl ? (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img src={chat.avatarUrl} alt={chat.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <span>{initialsFromName(chat.name)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-gray-900">{chat.name}</p>
                    <span className="ml-2 shrink-0 text-[11px] text-gray-400">{chat.time}</span>
                  </div>
                  <p className="truncate text-xs text-gray-500">{chat.lastMessage}</p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
