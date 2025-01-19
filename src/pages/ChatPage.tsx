import React from 'react';
import ChatWindow from '../components/Chat/ChatWindow';

const ChatPage: React.FC = () => {
    return (
        <div className="chat-page min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="w-full bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Chat Application</h1>
            </header>
            <main className="w-full max-w-4xl p-4">
                <ChatWindow />
            </main>
        </div>
    );
};

export default ChatPage;
