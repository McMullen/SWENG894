import React, { useState } from 'react';
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