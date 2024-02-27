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
        <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            background: '#eee'
        }}>
            <h1 style={{ margin: 0 }}>Baby Bytes</h1>
            <button onClick={handleLogout} style={{
                padding: '10px 20px',
                cursor: 'pointer',
            }}>Logout</button>
        </div>
        
    );
};

export default Banner;