import { User } from "../../types/User";

interface UserListProps {
    users: User[];
}

const UserList = ({ users }: UserListProps) => {
    console.log(users);
    
    return (
        <div className="user-list max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
            <ul className="space-y-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li
                            key={user._id}
                            className="flex justify-between items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            <span className="font-medium text-gray-800">{user.name}</span>
                            <span className="text-gray-600">{user.email}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600">No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
