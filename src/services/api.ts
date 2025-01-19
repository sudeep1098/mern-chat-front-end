import axios from 'axios';

const API_BASE = '/api';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE}/users`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching users:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const createUser = async (user: { name: string; email: string }) => {
    try {
        const response = await axios.post(`${API_BASE}/users`, user);
        return response.data;
    } catch (error: any) {
        console.error('Error creating user:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
