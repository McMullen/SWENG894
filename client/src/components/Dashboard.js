import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleAddBaby = () => {
        navigate('/add-baby');
    };

    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <button onClick={handleAddBaby}>Add New Baby</button>
        </div>
    );
};

export default Dashboard;