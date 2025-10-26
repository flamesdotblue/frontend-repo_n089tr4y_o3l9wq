import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';

export default function ChatHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-gray-200">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-sm font-semibold text-gray-900">{title}</h2>
          {subtitle ? (
            <span className="truncate text-xs text-gray-400">{subtitle}</span>
          ) : null}
        </div>
        <p className="mt-0.5 text-xs text-gray-400">Secure messages</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 ring-1 ring-gray-200">
          <span>Details</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-50 ring-1 ring-gray-200">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
