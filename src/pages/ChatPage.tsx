import React, { useEffect, useState } from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import UserList from '../components/Chat/UserList';
import { fetchUsers } from '../services/api';
import socket from '../services/socket';
import { User } from '../types/User';

const ChatPage: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [receiver, setReceiver] = useState<User | null>(null);
    const [isConnected, setIsConnected] = useState(socket.connected);

    console.log(receiver, users, isConnected);

    useEffect(() => {
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const getUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [socket.active]);

    return (
        <div className="chat-page min-h-screen bg-gray-100 flex">
            <div className="sidebar w-1/4 bg-gray-200 p-4">
                <UserList users={users} setReceiver={setReceiver} />
            </div>
            <div className="main-content flex-1 p-4">
                <ChatWindow isConnected={isConnected} receiver={receiver} />
            </div>
        </div>
    );
};

export default ChatPage;
