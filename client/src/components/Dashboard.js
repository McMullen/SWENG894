import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/auth';

const Dashboard = () => {
    const [babies, setBabies] = useState([]);
    const navigate = useNavigate();

    const handleAddBaby = () => {
        navigate('/add-baby');
    };

    useEffect(() => {
        const fetchBabies = async () => {
            try{
                const config = {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                };
                const res = await axios.get('/api/user/babies', config);
                setBabies(res.data);
            }catch(error){
                console.error('Error fetching babies', error.response?.data);
            }
        };
        fetchBabies();
    }, []);

    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <ul>
                {babies.map(baby => (
                    <li key={baby.id} onClick={() => navigate(`/baby/${baby.id}`)}>
                        {baby.babyName}
                    </li>
                ))}
            </ul>
            <button onClick={handleAddBaby}>Add New Baby</button>
        </div>
    );
};

export default Dashboard;