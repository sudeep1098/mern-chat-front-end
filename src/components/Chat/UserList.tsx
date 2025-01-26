import React, { useState } from 'react';
import { User } from '../../types/User';

interface UserListProps {
    users: User[] | [];
    receiver: User | null;
    currentUser: User | null;
    handleReceiverSelection: (user: User) => void;
    unreadMessages: { [key: string]: number };
}

const UserList: React.FC<UserListProps> = ({ users, receiver, currentUser, handleReceiverSelection, unreadMessages }) => {
    const filteredUsers = users.filter((user) => user._id !== currentUser?._id);
    console.log(unreadMessages);

    return (
        <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
            <ul className="user-list">
                {/* {currentUser && (
                <li
                    key={currentUser._id}
                    onClick={() => handleReceiverSelection(currentUser)}
                    className={`p-2 cursor-pointer rounded-lg ${receiver?._id === currentUser._id
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-300'
                        }`}
                >
                    You
                </li>
            )} */}

                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <li
                            key={user._id}
                            onClick={() => handleReceiverSelection(user)}
                            className={`p-2 cursor-pointer rounded-lg ${receiver?._id === user._id
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-300'
                                }`}
                        >
                            {user.name}
                            {unreadMessages[user._id] > 0 && (
                                <span className="badge bg-red-500 text-white text-xs rounded-full py-1 px-2">
                                    {unreadMessages[user._id]}
                                </span>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600">No users found.</p>
                )}
            </ul>
        </>
    );
};

export default UserList;
