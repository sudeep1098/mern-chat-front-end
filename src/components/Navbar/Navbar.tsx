import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../services/routes';
import Cookies from 'js-cookie';
import { logoutUser } from '../../services/api';

const Navbar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('jwt'));
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const jwt = Cookies.get('jwt');
            setIsAuthenticated(!!jwt);
            if (!jwt) navigate(routes.login.path);
        };

        checkAuth();
    }, [navigate]);

    // Handle logout
    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res.status === 'success') {
                setIsAuthenticated(false);
                navigate(routes.login.path);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const authLinks = (
        <>
            <button
                onClick={handleLogout}
                className="hover:text-gray-200 focus:outline-none"
            >
                Logout
            </button>
            <Link to={routes.users.path} className="hover:text-gray-200">
                {routes.users.name}
            </Link>
            <Link to={routes.chat.path} className="hover:text-gray-200">
                {routes.chat.name}
            </Link>
        </>
    );

    const guestLinks = (
        <>
            <Link to={routes.register.path} className="hover:text-gray-200">
                {routes.register.name}
            </Link>
            <Link to={routes.login.path} className="hover:text-gray-200">
                {routes.login.name}
            </Link>
        </>
    );

    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Brand/Home link */}
                <div className="text-xl font-bold">
                    <Link to={routes.home.path}>{routes.home.name}</Link>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-4">
                    <Link to={routes.home.path} className="hover:text-gray-200">
                        {routes.home.name}
                    </Link>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
