import React, { useState, useTransition } from 'react';
import { loginUser } from '../../services/api';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState<string>(''); // Message text
    const [status, setStatus] = useState<string>(''); // Message status (success or error)
    const [isPending, startTransition] = useTransition();
    const [type, setType] = useState('password');

    const handleToggle = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    // Handle form input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
        setError((prevError) => ({ ...prevError, [field]: '' }));
        setMessage('');
        setStatus('');
    };

    // Validate form fields
    const validateFields = (email: string, password: string) => {
        let isValid = true;
        const newError = { ...error };

        if (!email) {
            newError.email = 'Email is required';
            isValid = false;
        } else {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                newError.email = 'Please enter a valid email address';
                isValid = false;
            }
        }

        if (!password) {
            newError.password = 'Password is required';
            isValid = false;
        }

        setError(newError);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async () => {
        const { email, password } = formData;

        // Reset errors before validation
        setError({ email: '', password: '' });
        setMessage('');
        setStatus('');

        // Validate fields
        if (!validateFields(email, password)) return;

        startTransition(async () => {
            try {
                const response = await loginUser(email, password); // API call
                setMessage(response.message);
                setStatus(response.status); // Assuming 'status' is "success" or "error"
                setTimeout(() => {
                    setMessage('');
                    setStatus('');
                }, 3000);
                console.log('Login response:', response);
            } catch (error: any) {
                const errorMsg = error.message || 'Login failed. Please try again.';
                setMessage(errorMsg);
                setStatus('error');
                console.error('Error logging in:', error);
            }
        });
    };

    return (
        <div className="login-form max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
            {message && (
                <p
                    className={`text-sm font-medium mb-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}
                >
                    {message}
                </p>
            )}
            <div className="space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </div>
                <div className='flex'>
                    <input
                        type={type}
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <span className="flex justify-around items-center relative left-[-25px]" onClick={handleToggle}>
                        {type == 'text' ? <FaRegEye className='absolute' /> : <FaRegEyeSlash className='absolute' />}
                    </span>
                    {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className={`px-4 py-2 ${isPending ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold rounded-md hover:bg-blue-600`}
                >
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default Login;
