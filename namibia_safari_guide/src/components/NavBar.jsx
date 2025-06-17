import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-primary text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">NSG</span>
                    </div>
                    <h1 className="text-xl font-bold">Namibia Safari Guide</h1>
                </div>

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full bg-primary md:bg-transparent`}>
                    <ul className="flex flex-col md:flex-row md:space-x-6 py-4 md:py-0">
                        <li>
                            <Link
                                to="/"
                                className={`block py-2 px-4 hover:bg-accent hover:text-tertiary rounded transition ${isActive('/') ? 'bg-accent text-tertiary' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/planner"
                                className={`block py-2 px-4 hover:bg-accent hover:text-tertiary rounded transition ${isActive('/planner') ? 'bg-accent text-tertiary' : ''}`}
                            >
                                Trip Planner
                            </Link>
                        </li>
                        <li className="flex items-center py-2 px-4">
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;