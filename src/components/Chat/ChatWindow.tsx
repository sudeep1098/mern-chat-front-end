import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { User } from '../../types/User';
import { Message } from '../../types/Message';
import { getMessages, sendMessage } from '../../services/api';
import Typing from './Typing';

interface ChatWindowProps {
    isConnected: boolean;
    receiver: User | null;
    currentUser: User | null;
    messages: Message[];
    onSendMessage: (message: Message) => void;
    onTyping: (isTyping: boolean) => void;
    typing: { isTyping: boolean, receiver: string };
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    isConnected,
    receiver,
    currentUser,
    messages,
    onSendMessage,
    onTyping,
    typing,
}) => {
    const handleSendMessage = async (messageText: string) => {
        if (receiver && currentUser) {
            const message = await sendMessage(receiver._id, messageText);
            onSendMessage(message);
        }
    };

    const handleTyping = (isTyping: boolean) => {
        if (receiver && currentUser) {
            onTyping(isTyping);
        }
    };

    return (
        <div className="chat-window flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <div className="connection-status mb-4 flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold text-gray-800">Current User: {currentUser?.name}</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-800">
                        Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
                    </p>
                </div>
            </div>
            <MessageList messages={messages} currentUser={currentUser} receiver={receiver} />
            <Typing typing={typing} currentUser={currentUser} receiver={receiver} />
            <MessageInput isTyping={typing} onTyping={handleTyping} onSendMessage={handleSendMessage} receiver={receiver} />
        </div>
    );
};

export default ChatWindow;
