import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('');

  function submit(e) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  }

  return (
    <form onSubmit={submit} className="border-t border-gray-100 p-3">
      <div className="flex items-center gap-2 rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 px-3 py-2">
        <button type="button" className="rounded-xl p-2 text-gray-500 hover:bg-gray-50">
          <Paperclip className="h-4 w-4" />
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#3FA4BB] px-3 py-2 text-xs font-medium text-white shadow-sm hover:brightness-95"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </form>
  );
}
