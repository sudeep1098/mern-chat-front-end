import React, { useState } from 'react';

const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() !== '') {
            console.log('Message sent:', message);
            setMessage('');
        }
    };

    return (
        <div className="message-input p-4 flex items-center space-x-4 bg-gray-100 rounded-lg shadow-md mt-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
