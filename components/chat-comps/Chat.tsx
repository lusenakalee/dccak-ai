"use client"

import React, { useState } from 'react';
import { Send, Menu } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';

export default function Chat() {
  const [input, setInput] = useState('');
  const { toggleSidebar, open } = useSidebar();

  const handleSend = () => {
    if (input.trim()) {
      // Handle send logic here
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Sidebar Toggle */}
      <div className="border-b border-gray-200 px-4 py-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="lg:max-w-lg">
          <h2 className="text-base/7 font-semibold text-indigo-400">Template</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl text-indigo-400">
            Im DCCAK AI template
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
           This section require integration with backend AI services to function properly.
           
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-500 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none max-h-32"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full transition-colors"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 px-1">Press Enter to send, Shift + Enter for new line</p>
      </div>
    </div>
  );
}