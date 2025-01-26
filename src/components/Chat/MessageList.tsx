import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Message } from '../../types/Message';
import { markAsRead } from '../../services/api';

interface MessageListProps {
    messages: Message[];
    receiver: User | null;
    currentUser: User | null;
}

const MessageList: React.FC<MessageListProps> = ({
    messages,
    receiver,
    currentUser,
}) => {
    const [messagesWithStatus, setMessagesWithStatus] = useState(messages);

    useEffect(() => {
        const markMessagesAsReadForReceiver = async () => {
            if (receiver && currentUser) {
                const unreadMessages = messages.filter(
                    (msg) =>
                        msg.read === false
                );

                console.log(unreadMessages);

                for (const msg of unreadMessages) {
                    console.log(msg);
                    await markAsRead(msg._id);
                }

                setMessagesWithStatus((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.read === false ? { ...msg, read: true } : msg
                    )
                );
            }
        };

        markMessagesAsReadForReceiver();
    }, [receiver, currentUser, messages]);

    useEffect(() => {
        setMessagesWithStatus(messages);
    }, [messages]);

    return (
        <div className="message-list flex-1 overflow-y-auto p-4 space-y-4">
            {messagesWithStatus.map((msg) => {
                const isCurrentUser = msg.sender === currentUser?._id;
                return (
                    <div
                        key={msg._id}
                        className={`message p-2 rounded-lg shadow-md max-w-xs ${isCurrentUser ? 'bg-blue-500 text-white ml-auto' : 'bg-white text-gray-800 mr-auto'}`}
                    >
                        <div className="sender text-sm font-semibold">
                            {isCurrentUser ? 'You' : receiver?.name}:
                        </div>
                        <div className="content text-sm break-words">{msg.message}</div>
                        <div className="message-status text-xs mt-1 flex items-center">
                            {msg.read ? (
                                <span className="text-gray-500">✔✔</span>
                            ) : (
                                <span className="text-gray-500">✔</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
