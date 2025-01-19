import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../services/routes';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="text-xl font-bold">
                    <Link to={routes.home.path}>{routes.home.name}</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to={routes.home.path} className="hover:text-gray-200">
                        {routes.home.name}
                    </Link>
                    <Link to={routes.chat.path} className="hover:text-gray-200">
                        {routes.chat.name}
                    </Link>
                    <Link to={routes.register.path} className="hover:text-gray-200">
                        {routes.register.name}
                    </Link>
                    <Link to={routes.login.path} className="hover:text-gray-200">
                        {routes.login.name}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
