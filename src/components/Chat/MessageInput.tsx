import React, { useRef } from 'react';
import socket from '../../services/socket';
import { sendMessage } from '../../services/api';
import { User } from '../../types/User';

interface MessageInputProps {
    receiver: User | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ receiver }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!receiver) {
            alert('Please select a user to send a message.');
            return;
        }

        const message = inputRef.current?.value.trim();
        if (message) {
            try {
                // Send message to the API
                const response = await sendMessage(receiver._id, message);
                console.log('Message sent:', response);

                // Emit the message via socket
                socket.emit('message', message);

                // Clear the input field
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSend}
            className="message-input p-4 flex items-center space-x-4 bg-gray-100 rounded-lg shadow-md mt-4"
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!receiver}
            />
            <button
                type="submit"
                disabled={!receiver || socket.disconnected}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;
