import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav>
            <h1>Personal Finance Visualizer</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;