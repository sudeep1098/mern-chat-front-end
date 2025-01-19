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

// Send a message
export const sendMessage = async (senderId: string, receiverId: string, content: string) => {
    try {
        const response = await axios.post(`${API_BASE}/messages/send`, {
            senderId,
            receiverId,
            content
        });
        return response.data;
    } catch (error: any) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Get messages between two users
export const getMessages = async (userId1: string, userId2: string) => {
    try {
        const response = await axios.get(`${API_BASE}/messages/${userId1}/${userId2}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching messages:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Mark a message as read
export const markAsRead = async (messageId: string) => {
    try {
        const response = await axios.patch(`${API_BASE}/messages/${messageId}/read`);
        return response.data;
    } catch (error: any) {
        console.error('Error marking message as read:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
