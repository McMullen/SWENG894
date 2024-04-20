import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../services/auth';
import { formatDate, calculateAge } from '../../../utils/dateUtils';
import './PredictStyles.css';

const Predict = () => {
    const navigate = useNavigate();
    const { babyId } = useParams();
    const [babyInfo, setBabyInfo] = useState(null);
    const [predictedHeight, setPredictedHeight] = useState(null);
    const [futureAge, setFutureAge] = useState('');
    
    
    const goToBabyDashboard = () => {
        navigate(`/baby-dashboard/${babyId}`);
      };

    const handleSubmit = async e => {
        try{
            const config = {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                params: {
                    futureAge: futureAge
                }
            };
            const body = JSON.stringify({futureAge: futureAge});
            const res = await axios.get(`/api/growth/get-predicted-height/${babyId}`, config);
            setPredictedHeight(res.data.predictedHeight);
            console.log(res.data.predictedHeight);
        }catch(error){
            console.error('Error fetching babies', error.response?.data);
        }
    };
    
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
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching baby information', error.response.data);
            }
        };
  
        fetchBabyInfo();
    }, [babyId]);

    //if (!babyInfo) return <div>Loading...</div>;

    return (
        <div className="grid-container">
          <div className="grid-item">Baby's Age: {babyInfo ? calculateAge(babyInfo.birthDate) : 'Loading...'}</div>
          <div className="grid-item">Current Height: {babyInfo ? babyInfo.birthHeight : 'Loading...'} cm</div>
          <div className="grid-item">
            Future Age: (months)<input type="number" value={futureAge} onChange={(e) => setFutureAge(e.target.value)} placeholder="Enter future age"/>
          </div>
          <div className="grid-item">
            Future Height: {predictedHeight !== null ? `${predictedHeight} cm` : 'Waiting for prediction...'}
          </div>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="back-to-baby-dashboard" onClick={goToBabyDashboard}>Back</button>
        </div>
      );
};

export default Predict;