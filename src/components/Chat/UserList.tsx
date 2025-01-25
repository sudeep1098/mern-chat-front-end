import React from 'react';
import { User } from '../../types/User';

interface UserListProps {
    users: User[] | [];
    setReceiver: (receiver: User | null) => void;
}

const UserList: React.FC<UserListProps> = ({ users, setReceiver }) => {
    return (
        <ul className="user-list">
            {users.length > 0 ? users.map((user) => (
                <li
                    key={user._id}
                    onClick={() => setReceiver(user)}
                    className="p-2 cursor-pointer hover:bg-gray-300"
                >
                    {user.name}
                </li>
            )) : (
                <p className="text-gray-600">No users found.</p>
            )}
        </ul>
    );
};

export default UserList;
