import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';
import { getMessages, getUserByToken } from '../../services/api';
import { User } from '../../types/User';
import { Message } from '../../types/Message';
import axios from 'axios';

const MessageList: React.FC<{ receiver: User | null }> = ({ receiver }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    console.log(currentUser);

    // Fetch the current user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await getUserByToken();
                setCurrentUser(user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };
        fetchCurrentUser();
    }, []);

    // Handle incoming socket messages
    useEffect(() => {
        socket.on('message', (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        return () => {
            socket.off('message');
        };
    }, []);

    // Fetch messages between the current user and the receiver
    useEffect(() => {
        if (receiver) {
            fetchMessages(receiver._id);
        }
    }, [receiver]);

    const fetchMessages = async (receiverId: string) => {
        try {
            const sentMessages = await axios.get(`/api/messages/sent/${receiverId}`, { withCredentials: true });
            const receivedMessages = await axios.get(`/api/messages/received/${receiverId}`, { withCredentials: true });
            console.log(sentMessages, receivedMessages);

            const allMessages = [...sentMessages.data, ...receivedMessages.data];
            console.log(allMessages);

            allMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            setMessages(allMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="message-list flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
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
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
