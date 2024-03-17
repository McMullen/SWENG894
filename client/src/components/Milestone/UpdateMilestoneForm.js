import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import { formatCalendarDate } from '../../utils/dateUtils';
import './MilestoneFormStyles.css';

const UpdateMilestoneForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { babyId } = location.state;
    const { milestoneId } = useParams();
    const [milestone, setMilestone] = useState(null);

    const onChange = (e) => {
        setMilestone({ ...milestone, [e.target.name]: e.target.value });
      };

    useEffect(() => {
        const fetchMilestoneInfo = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                };
                const res = await axios.get(`/api/milestone/get/${milestoneId}`, config);
                setMilestone(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching baby information', error.response.data);
            }
        };
  
        fetchMilestoneInfo();
    }, [milestoneId]);

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            };
            const body = JSON.stringify({ ...milestone, babyId });
            await axios.put(`/api/milestone/update/${milestoneId}`, body, config);
            navigate(`/baby-dashboard/${babyId}`);
        }catch(err){
            console.error(err.response.data);
        }
    };

    if (!milestone) {
        return <div>Loading...</div>;
    }

    return (
        <div className="milestone-form-container">
        <div className="milestone-box">
            <h1 className="milestone-title">Update Milestone</h1>
            <form onSubmit={onSubmit} className="milestone-form">
            <div className="milestone-input">
                <label>Name: </label>
                <input
                type="text"
                id="name"
                name="name"
                value={milestone.name}
                onChange={onChange}
                placeholder="Name"
                required
                />
            </div>
            <div className="milestone-input">
                <label>Date Achieved: </label>
                <input
                type="date"
                id="date"
                name="date"
                value={formatCalendarDate(milestone.date)}
                onChange={onChange}
                placeholder="Date"
                required
                />
            </div>
            <div className="milestone-input">
                <label>Age: </label>
                <input
                type="text"
                id="age"
                name="age"
                value={milestone.age}
                onChange={onChange}
                placeholder="Age"
                />
            </div>
            <div className="milestone-input">
                <label htmlFor="type">Type: </label>
                <select id="type" name="type" value={milestone.type} onChange={e => onChange(e)} required>
                <option value="">Select...</option>
                <option value="First Steps">First Steps</option>
                <option value="Other">Other</option>
                </select>
            </div>
            <div className="milestone-input">
                <label>Description: </label>
                <textarea
                id="description"
                name="description"
                value={milestone.description}
                onChange={onChange}
                placeholder="Description"
                required
                />
            </div>
            <button type="submit" className="add-button">Update</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateMilestoneForm;
