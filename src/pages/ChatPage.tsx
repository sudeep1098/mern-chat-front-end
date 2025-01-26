import React, { useEffect, useState } from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import UserList from '../components/Chat/UserList';
import { fetchUsers, getMessages, getUserByToken } from '../services/api';
import socket from '../services/socket';
import { User } from '../types/User';
import { Message } from '../types/Message';
import Cookies from 'js-cookie';

const ChatPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [receiver, setReceiver] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [typing, setTyping] = useState({ isTyping: false, receiver: '' });
    const [notification, setNotification] = useState<{ [key: string]: number }>({});

    const initializeSocket = () => {
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));
        socket.on('receive-message', (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            if (receiver?._id !== msg.sender) {
                setNotification((prevNotification) => {
                    const unreadCount = prevNotification[msg.sender] || 0;
                    return { ...prevNotification, [msg.sender]: unreadCount + 1 };
                });
            }
        });
        socket.on('typing', (data) => {
            setTyping(data);
        })
    };

    const getUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const getCurrentUser = async () => {
        try {
            if (!Cookies.get('jwt')) return;
            const user = await getUserByToken();
            setCurrentUser(user);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };


    const sendMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        socket.emit('send-message', message);
        socket.emit('send-notification', message);
    };

    const fetchMessages = async (receiverId: string) => {
        try {
            const response = await getMessages(receiverId);
            setMessages(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleTyping = (isTyping: boolean) => {
        if (receiver) {
            setTyping({ isTyping, receiver: receiver._id });
            socket.emit('typing', { receiver: receiver._id, isTyping });
        }
    };

    const handleReceiverSelection = (user: User) => {
        setReceiver(user);
        setNotification((prevNotification) => ({ ...prevNotification, [user._id]: 0 }));
        fetchMessages(user._id);
    };

    useEffect(() => {
        if (currentUser) {
            socket.emit("register", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        initializeSocket();
        getCurrentUser();
        getUsers();

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receive-message');
        };
    }, []);

    return (
        <div className="chat-page min-h-screen bg-gray-100 flex">
            <div className="sidebar w-1/4 bg-gray-200 p-4">
                <UserList
                    users={users}
                    receiver={receiver}
                    currentUser={currentUser}
                    handleReceiverSelection={handleReceiverSelection}
                    unreadMessages={notification}
                />
            </div>
            <div className="main-content flex-1 p-4">
                <ChatWindow
                    isConnected={isConnected}
                    receiver={receiver}
                    currentUser={currentUser}
                    messages={messages}
                    onSendMessage={sendMessage}
                    onTyping={handleTyping}
                    typing={typing}
                />
            </div>
        </div>
    );
};

export default ChatPage;
