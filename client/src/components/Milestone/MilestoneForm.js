import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import './MilestoneFormStyles.css';

const MilestoneForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    age: '',
    type: '',
    description: '',
  });

  const navigate = useNavigate();
  const { babyId } = useParams();
  const { name, date, age, type, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        };
        const body = JSON.stringify({milestone: formData});
        const res = await axios.post(`/api/milestone/new/${babyId}`, body, config);
        console.log(res.data);
        navigate(`/baby-dashboard/${babyId}`);
    }catch(err){
        console.error(err.response.data);
    }
};

  return (
    <div className="milestone-form-container">
      <div className="milestone-box">
        <h1 className="milestone-title">New Milestone</h1>
        <form onSubmit={onSubmit} className="milestone-form">
          <div className="milestone-input">
            <label>Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
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
              value={date}
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
              value={age}
              onChange={onChange}
              placeholder="Age"
            />
          </div>
          <div className="milestone-input">
            <label htmlFor="type">Type: </label>
            <select id="type" name="type" value={type} onChange={e => onChange(e)} required>
              <option value="">Select...</option>
              <option value="First Smile">First Smile</option>
              <option value="First Coo">First Coo</option>
              <option value="Respond to Name">Respond to Name</option>
              <option value="First Steps">First Steps</option>
              <option value="First Words">First Words</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="milestone-input">
            <label>Description: </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
            />
          </div>
          <button type="submit" className="add-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default MilestoneForm;
