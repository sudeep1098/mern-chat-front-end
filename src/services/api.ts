import axios from 'axios';

const API_BASE = '/api';

// Fetch users
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE}/users`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching users:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// get user by token
export const getUserByToken = async () => {
    try {
        const response = await axios.get(`${API_BASE}/users/currentUser`);
        console.log(response);

        return response.data;
    } catch (error: any) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}

// Create a user
export const registerUser = async (user: { name: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/register`, user);
        return response.data;
    } catch (error: any) {
        console.error('Error creating user:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Login a user
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// Logout a user
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_BASE}/auth/logout`);
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

// Send a message
export const sendMessage = async (receiverId: string, message: string) => {
    try {
        const response = await axios.post(`${API_BASE}/messages/send`, {
            receiverId,
            message
        });
        return response.data;
    } catch (error: any) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Get messages between two users
export const getMessages = async (receiverId: string) => {
    try {
        const response = await axios.post(`${API_BASE}/messages`, { receiverId });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching messages:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Mark a message as read
export const markAsRead = async (messageId: string) => {
    try {
        const response = await axios.patch(`${API_BASE}/messages/${messageId}/markAsRead`);
        return response.data;
    } catch (error: any) {
        console.error('Error marking message as read:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
