import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import { formatDate, calculateAge } from '../../utils/dateUtils';
import './BabyDashboardStyles.css';

const BabyDashboard = () => {
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [babyInfo, setBabyInfo] = useState(null);
  const { babyId } = useParams();

  const goToUserDashboard = () => {
    navigate('/dashboard');
  };

  const goToNewMilestone = () => {
    navigate(`/new-milestone/${babyId}`);
  };

  const goToUpdateMilestone = (milestone) => {
    navigate(`/update-milestone/${milestone.id}`, {state: {babyId}});
  };

  const goToNewVaccine = () => {
    navigate(`/new-vaccination/${babyId}`)
  };

  const goToNewGrowth = () => {
    navigate(`/new-growth/${babyId}`)
  }

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

      const fetchMilestones = async () => {
        try {
          const config = {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
          };
          const res = await axios.get(`/api/milestone/get-all/${babyId}`, config);
          setMilestones(res.data);
        } catch (error) {
          console.error('Error fetching milestones', error.response?.data);
        }
      };
  
      fetchMilestones();

      const fetchHealthRecords = async () => {
        try{
          const config = {
            headers: {
              'Authorization': `Bearer ${getAuthToken()}`
            }
          };
          const res = await axios.get(`/api/health/get-all-vaccinations/${babyId}`, config);
          setMilestones(res.data);
        }catch (error) {
          console.error('Error fetching health records', error.response?.data);
        }
      };

      fetchHealthRecords();

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
      <div className="middle-section">
        <div className="milestones">
          <h2>Milestones</h2>
          <ul>
          {milestones.map((milestone) => (
            <li key={milestone.id} onClick={() => goToUpdateMilestone(milestone)}>
              {milestone.name} - Date Achieved: {formatDate(milestone.date)} - Description: {milestone.description}
            </li>
          ))}
        </ul>
          <button onClick={goToNewMilestone} className="new-milestone">New Milestone</button>
        </div>
        <div className="health-records">
          <h2>Health Records</h2>
          <ul>
          {healthRecords.map((healthRecord) => (
            <li>
              Record Type: {healthRecord.recordType} - Vaccine Name: {healthRecord.vaccineName} - Date Given: {formatDate(healthRecord.dateGiven)} - Description: {healthRecord.description}
            </li>
          ))}
        </ul>
          <button onClick={goToNewVaccine} className="new-health-record">New Health Record</button>
        </div>
      </div>
      <div className="lower-section">
        <div className="growth-records">
          <div className="gowths">
            <h2>Growth Records</h2>
            <ul>

            </ul>
            <button onClick={goToNewGrowth} className="new-growth-record">New Growth</button>
          </div>
        </div>
      </div>
      <div className="back-to-dashboard">
        <button onClick={goToUserDashboard} className="dashboard-button">Back</button>
      </div>
    </div>
  );
};

export default BabyDashboard;
