"use client"

import React, { useState } from 'react';
import { Send, MoreVertical, Search } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's it going?", sender: 'other', time: '10:30 AM' },
    { id: 2, text: "I'm doing great! Just working on some projects.", sender: 'me', time: '10:32 AM' },
    { id: 3, text: "That's awesome! What are you building?", sender: 'other', time: '10:33 AM' },
    { id: 4, text: "A chat application with a cool sidebar design", sender: 'me', time: '10:35 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold">
            JD
          </div>
          <div>
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
         
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md ${
                message.sender === 'me'
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                  : 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm'
              } px-4 py-2.5`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-500 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none max-h-32"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
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