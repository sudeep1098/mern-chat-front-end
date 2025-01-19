import React from 'react';

const UserProfile: React.FC = () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };

    return (
        <div className="user-profile max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{user.name}</h2>
            <p className="text-lg text-gray-600">Email: <span className="text-blue-500">{user.email}</span></p>
        </div>
    );
};

export default UserProfile;
