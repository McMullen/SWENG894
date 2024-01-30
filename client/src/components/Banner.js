import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Banner = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
        <div style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
            <h1>Baby Bytes</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Banner;