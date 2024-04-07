import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../services/auth';
import './VaccinationStyles.css';

const VaccinationForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    dateGiven: '',
    nextDueDate: '',
    notes: ''
  });

  const navigate = useNavigate();
  const { babyId } = useParams();
  const { vaccineName, dateGiven, nextDueDate, notes } = formData;

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

      const body = JSON.stringify({vaccine: formData});
      const res = await axios.post(`/api/health/add-vaccination/${babyId}`, body, config);
      console.log(res.data);
      navigate(`/baby-dashboard/${babyId}`);
    } catch (error) {
      console.error('Error adding vaccination record:', error.response.data);
    }
  };

  return (
    <div className="vaccine-form-container">
      <div className="vaccine-box">
        <h1 className="vaccine-title">New Vaccination</h1>
        <form onSubmit={onSubmit} className='vaccineForm'>
          <div className='vaccine-input'>
            <label htmlFor="vaccineName">Vaccine Name: </label>
            <input
              type="text"
              id="vaccineName"
              name="vaccineName"
              value={vaccineName}
              onChange={onChange}
              required
            />
          </div>
          <div className='vaccine-input'>
            <label htmlFor="dateGiven">Date Given: </label>
            <input 
              type="date"
              id="dateGiven"
              name="dateGiven"
              value={dateGiven}
              onChange={onChange}
              required
            />
          </div>
          <div className='vaccine-input'>
            <label htmlFor="nextDueDate">Next Due Date: </label>
            <input 
              type="date"
              id="nextDueDate"
              name="nextDueDate"
              value={nextDueDate}
              onChange={onChange}
            />
          </div>
          <div className='vaccine-input'>
            <label htmlFor="notes">Notes: </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={onChange}
            />
          </div>
          <button type="submit" className='add-button'>Add Record</button>
        </form>
      </div>
    </div>
  );
};

export default VaccinationForm;