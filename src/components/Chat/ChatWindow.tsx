import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import socket from '../../services/socket';
import { User } from '../../types/User';

const ChatWindow: React.FC<{ isConnected: boolean; receiver: User|null }> = ({
    isConnected,
    receiver,
}) => {
    const handleConnect = () => socket.connect();
    const handleDisconnect = () => socket.disconnect();

    return (
        <div className="chat-window flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <div className="connection-status mb-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800">
                    {isConnected ? 'Connected' : 'Disconnected'}
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={handleConnect}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        disabled={isConnected}
                    >
                        Connect
                    </button>
                    <button
                        onClick={handleDisconnect}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                        disabled={!isConnected}
                    >
                        Disconnect
                    </button>
                </div>
            </div>

            <MessageList receiver={receiver} />
            <MessageInput receiver={receiver} />
        </div>
    );
};

export default ChatWindow;
