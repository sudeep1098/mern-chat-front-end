import React from 'react';
import UserForm from '../components/UserManagement/UserForm';
import UserList from '../components/UserManagement/UserList';

const UsersPage: React.FC = () => {
    return (
        <div className="users-page min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">User Management</h1>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* User Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add/Edit User</h2>
                    <UserForm />
                </div>

                {/* User List Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
