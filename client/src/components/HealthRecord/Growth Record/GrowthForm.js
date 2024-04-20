import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../services/auth';
import './GrowthStyles.css';

const GrowthForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    age: '',
    height: '',
    weight: '',
    description: ''
  });

  const navigate = useNavigate();
  const { babyId } = useParams();
  const { date, age, height, weight, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      };

      const body = JSON.stringify({growth: formData});
      const res = await axios.post(`/api/growth/new/${babyId}`, body, config);
      navigate(`/baby-dashboard/${babyId}`);
    } catch (error) {
      console.error('Error adding growth record:', error.response.data);
    }
  };

  return (
    <div className="growth-form-container">
      <div className="growth-box">
        <h1 className="growth-title">New Growth Record</h1>
        <form onSubmit={onSubmit} className='growthForm'>
          <div className='growth-input'>
          <div className='vaccine-input'>
            <label htmlFor="date">Date Recorded: </label>
            <input 
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={onChange}
              required
            />
          </div>
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={onChange}
              required
            />
          </div>
          <div className='growth-input'>
            <label htmlFor="height">Height: </label>
            <input 
              type="number"
              id="height"
              name="height"
              value={height}
              onChange={onChange}
              required
            />
          </div>
          <div className='growth-input'>
            <label htmlFor="weight">Weight: </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={onChange}
              required
            />
          </div>
          <div className='growth-input'>
            <label htmlFor="description">Notes: </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>
          <button type="submit" className='add-button'>Add Record</button>
        </form>
      </div>
    </div>
  );
};

export default GrowthForm;