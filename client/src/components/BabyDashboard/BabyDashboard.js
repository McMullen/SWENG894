import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import { formatDate, calculateAge } from '../../utils/dateUtils';
import './BabyDashboardStyles.css';

const BabyDashboard = () => {
  const navigate = useNavigate();
  const [babyInfo, setBabyInfo] = useState(null);
  const { babyId } = useParams();

  const goToUserDashboard = () => {
    navigate('/dashboard');
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
          } catch (error) {
              console.error('Error fetching baby information', error.response.data);
          }
      };

      fetchBabyInfo();
  }, [babyId]);

  if (!babyInfo) return <div>Loading...</div>;

  return (
    <div className="baby-dashboard">
      <div className="baby-details">
        <div><strong>Baby's Name:</strong> {babyInfo.babyName}</div>
        <div><strong>Age:</strong> {calculateAge(babyInfo.birthDate)}</div>
        <div><strong>DoB:</strong> {formatDate(babyInfo.birthDate)}</div>
        <div><strong>Current Weight:</strong> {babyInfo.birthWeight}</div>
      </div>
      <div className="lower-section">
        <div className="milestones">
          <h2>Milestones</h2>
          {/* List of milestones */}
          <button className="new-milestone">New Milestone</button>
        </div>
        <div className="medications">
          <h2>Medications</h2>
          {/* List of medications */}
          <button className="new-medication">New Medication</button>
        </div>
      </div>
      <div className="back-to-dashboard">
        <button onClick={goToUserDashboard} className="dashboard-button">Back</button>
      </div>
    </div>
  );
};

export default BabyDashboard;
