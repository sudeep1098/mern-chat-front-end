import React, { useState, useEffect } from 'react';
import UserList from '../components/UserManagement/UserList';
import { fetchUsers } from '../services/api';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState([]);

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
    }, []);

    return (
        <div className="users-page max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
            <UserList users={users} />
        </div>
    );
};

export default UsersPage;
