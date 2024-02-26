import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../services/auth';

const BabyDashboard = () => {
    const [babyInfo, setBabyInfo] = useState(null);
    const { babyId } = useParams();

    useEffect(() => {
        const fetchBabyInfo = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                };
                const res = await axios.get(`/api/baby/babyInfo/${babyId}`, config);
                setBabyInfo(res.data);
            } catch (error) {
                console.error('Error fetching baby information', error.response.data);
            }
        };

        fetchBabyInfo();
    }, [babyId]);

    if (!babyInfo) return <div>Loading...</div>;

    return (
        <div>
            <h1>{babyInfo.babyName}</h1>
        </div>
    );
};

export default BabyDashboard;
