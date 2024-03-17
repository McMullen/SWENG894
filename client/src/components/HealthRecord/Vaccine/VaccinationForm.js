import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../services/auth';

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

      await axios.post('/api/vaccinations', { ...formData, babyId }, config);
      alert('Vaccination record added successfully!');
      setFormData({
        vaccineName: '',
        dateGiven: '',
        nextDueDate: '',
        notes: ''
      });

    } catch (error) {
      console.error('Error adding vaccination record:', error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Add Vaccination Record</h2>
      <div>
        <label htmlFor="vaccineName">Vaccine Name:</label>
        <input type="text" id="vaccineName" name="vaccineName" value={vaccineName} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="dateGiven">Date Given:</label>
        <input type="date" id="dateGiven" name="dateGiven" value={dateGiven} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="nextDueDate">Next Due Date:</label>
        <input type="date" id="nextDueDate" name="nextDueDate" value={nextDueDate} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" value={notes} onChange={onChange} />
      </div>
      <button type="submit">Add Record</button>
    </form>
  );
};

export default VaccinationForm;