import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import './BabyRegistrationStyles.css';

const BabyRegistration = () => {
    const [formData, setFormData] = useState({
        babyName: '',
        birthDate: '',
        sex: '',
        birthWeight: '',
        birthHeight: ''
    });

    const { babyName, birthDate, sex, birthWeight, birthHeight } = formData;

    const onChange = e => {
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
            const body = JSON.stringify({baby: formData});
            const res = await axios.post('/api/baby/add', body, config);
            console.log(res.data);
        }catch(err){
            console.error(err.response.data);
        }
    };

    return(
        <div className="baby-registration-container">
            <div className="baby-registration-box">
                <h1 className="baby-registration-title">Register New Baby</h1>
                <form onSubmit={e => onSubmit(e)} className="baby-registration-form">
                    <div className="baby-registration-input">
                        <label htmlFor="babyName">Baby's Name: </label>
                        <input 
                            id="babyName"
                            type="text"
                            name="babyName"
                            value={babyName}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="baby-registration-input">
                        <label htmlFor="birthDate">Birth Date: </label>
                        <input
                            id="birthDate"
                            type="date"
                            name="birthDate"
                            value={birthDate}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="baby-registration-input">
                        <label htmlFor="sex">Sex: </label>
                        <select id="sex" name="sex" value={sex} onChange={e => onChange(e)} required>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="baby-registration-input">
                        <label htmlFor="birthWeight">Birth Weight: </label>
                        <input 
                            id="birthWeight"
                            type="text"
                            name="birthWeight"
                            value={birthWeight}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="baby-registration-input">
                        <label htmlFor="birthHeight">Birth Height: </label>
                        <input 
                            id="birthHeight"
                            type="text"
                            name="birthHeight"
                            value={birthHeight}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Register Baby</button>
                </form>
            </div>
        </div>
    );
};

export default BabyRegistration;