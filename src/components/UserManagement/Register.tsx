import React, { useState, useTransition } from 'react';
import { registerUser } from '../../services/api';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { routes } from '../../services/routes';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
    };

    // Handle form input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
        setError((prevError) => ({ ...prevError, [field]: '' }));
        setMessage(null);
        setStatus('');
    };

    const validateRequiredFields = (name: string, email: string, password: string, confirmPassword: string) => {
        let isValid = true;
        const newError = { ...error };

        if (!name) {
            newError.name = 'Name is required';
            isValid = false;
        }
        if (!email) {
            newError.email = 'Email is required';
            isValid = false;
        }
        if (!password) {
            newError.password = 'Password is required';
            isValid = false;
        }
        if (!confirmPassword) {
            newError.confirmPassword = 'Confirm Password is required';
            isValid = false;
        }

        setError(newError);
        return isValid;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError((prevError) => ({
                ...prevError,
                email: 'Please enter a valid email address',
            }));
            return false;
        }
        return true;
    };

    const validatePasswordMatch = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            setError((prevError) => ({
                ...prevError,
                confirmPassword: 'Passwords do not match',
            }));
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        const { name, email, password, confirmPassword } = formData;

        // Reset errors before validation
        setError({ name: '', email: '', password: '', confirmPassword: '' });
        setMessage(null); // Clear previous messages
        setStatus(''); // Clear previous status

        // Validate required fields
        if (!validateRequiredFields(name, email, password, confirmPassword)) return;

        // Validate email format
        if (!validateEmail(email)) return;

        // Validate passwords match
        if (!validatePasswordMatch(password, confirmPassword)) return;

        startTransition(async () => {
            try {
                const response = await registerUser({ name, email, password });
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                setMessage(response.message);
                setStatus('success');

                setTimeout(() => {
                    setMessage('');
                    setStatus('');
                }, 3000);
                navigate(`${routes.login.path}`);
            } catch (error: any) {
                const errorMsg = error.message || 'Failed to create user.';
                setMessage(errorMsg);
                setStatus('error');
                console.error('Error creating user:', error);
            }
        });
    };

    return (
        <div className="user-form max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add User</h2>
            {message && (
                <p
                    className={`text-sm font-medium mb-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'
                        }`}
                >
                    {message}
                </p>
            )}
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                </div>
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
                        type={passwordType}
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <span className="flex justify-around items-center relative left-[-25px]" onClick={handlePasswordToggle}>
                        {passwordType === 'text' ? <FaRegEye className='absolute' /> : <FaRegEyeSlash className='absolute' />}
                    </span>
                    {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                </div>
                <div className='flex'>
                    <input
                        type={confirmPasswordType}
                        placeholder="Confirm Password"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                    <span className="flex justify-around items-center relative left-[-25px]" onClick={handleConfirmPasswordToggle}>
                        {confirmPasswordType === 'text' ? <FaRegEye className='absolute' /> : <FaRegEyeSlash className='absolute' />}
                    </span>
                    {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isPending} // Disable the button while in pending state
                    className={`px-4 py-2 font-semibold rounded-md ${isPending ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                    {isPending ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default Register;
