import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../services/auth';
import './PredictStyles.css';

const Predict = () => {
    const navigate = useNavigate();
    const { babyId } = useParams();
    
    const goToBabyDashboard = () => {
        navigate(`/baby-dashboard/${babyId}`);
      };
    
    useEffect(() => {
        const fetchCDCData = async () => {
            try{
                const config = {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                };
                const res = await axios.get('/api/growth/get-CDC-Data', config);
                console.log(res);
                //setBabies(res.data);
            }catch(error){
                console.error('Error fetching babies', error.response?.data);
            }
        };
        fetchCDCData();
    }, []);

    return (
        <div>
            <h1>Hello World!</h1>
            <div className="back-to-baby-dashboard">
            <button onClick={goToBabyDashboard} className="baby-dashboard-button">Back</button>
            </div>
        </div>
    );
};

export default Predict;