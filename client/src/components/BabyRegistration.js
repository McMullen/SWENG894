import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../services/auth';

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
                    'Authorization': 'Bearer ${getAuthToken()}'
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
        <div>
            <h2>Register New Baby</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <label>Baby's Name:</label>
                    <input 
                        type="text"
                        name="babyName"
                        value={babyName}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={birthDate}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div>
                    <label>Sex:</label>
                    <select name="sex" value={sex} onChange={e => onChange(e)} required>
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Birth Weight:</label>
                    <input 
                        type="text"
                        name="birthWeight"
                        value={birthWeight}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <label>Birth Height:</label>
                    <input 
                        type="text"
                        name="birthHeight"
                        value={birthHeight}
                        onChange={e => onChange(e)}
                    />
                </div>
                <button type="submit">Register Baby</button>
            </form>
        </div>
    );
};

export default BabyRegistration;