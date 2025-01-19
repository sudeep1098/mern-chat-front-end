import React from 'react';

const MessageList: React.FC = () => {
    // Placeholder messages
    const messages = [
        { id: 1, sender: 'John', content: 'Hello!' },
        { id: 2, sender: 'Jane', content: 'Hi there!' },
    ];

    return (
        <div className="message-list flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className="message p-2 bg-white rounded-lg shadow-md">
                    <div className="sender text-sm font-semibold text-gray-800">{msg.sender}:</div>
                    <div className="content text-gray-700">{msg.content}</div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
