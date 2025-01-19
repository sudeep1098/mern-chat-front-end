import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow: React.FC = () => {
  return (
    <div className="chat-window max-w-4xl mx-auto bg-gray-100 p-4 rounded-lg shadow-lg h-screen flex flex-col">
      <MessageList />
      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;
