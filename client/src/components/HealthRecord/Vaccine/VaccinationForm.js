import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../services/auth';
import './VaccinationStyles.css';

const VaccinationForm = ({ babyId }) => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    dateGiven: '',
    nextDueDate: '',
    notes: ''
  });

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
      await axios.post(`/api/health/add-vaccination/${babyId}`, body, config);
      alert('Vaccination record added successfully!');
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
            <label>Vaccine Name: </label>
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
            <label>Date Given: </label>
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
            <label>Next Due Date: </label>
            <input 
              type="date"
              id="nextDueDate"
              name="nextDueDate"
              value={nextDueDate}
              onChange={onChange}
            />
          </div>
          <div className='vaccine-input'>
            <label>Notes: </label>
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