import React, { useRef, useState } from 'react';
import { User } from '../../types/User';

interface MessageInputProps {
    receiver: User | null;
    onSendMessage: (messageText: string) => void;
    onTyping: (isTyping: boolean) => void;
    isTyping: { isTyping: boolean, receiver: string };
}

const MessageInput: React.FC<MessageInputProps> = ({ receiver, onSendMessage, onTyping, isTyping }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    let typingTimeout: any;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const messageText = inputRef.current?.value.trim();
        if (messageText) {
            onSendMessage(messageText);
            if (inputRef.current) inputRef.current.value = '';
            onTyping(false);
        }
    };

    const handleInputChange = () => {
        if (!isTyping.isTyping) {
            onTyping(true);
        }
        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {
            onTyping(false);
        }, 2000);
    };

    return (
        <form onSubmit={handleSend} className="message-input flex items-center space-x-4 p-4">
            <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                disabled={!receiver}
                className="flex-1 p-2 border rounded"
                onChange={handleInputChange}
            />
            <button
                type="submit"
                disabled={!receiver}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;
