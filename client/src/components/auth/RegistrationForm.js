import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationStyles.css';
import { setAuthToken } from '../../services/auth';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {name, email, password} = formData;

    const onChange = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({user: formData});
            const res = await axios.post('/api/users/register', body, config);
            setAuthToken(res.data.token);
            navigate('/dashboard');
        }catch(err){
            console.error(err.response.data);
        }
    };

    return (
      <div className="registration-container">
        <div className="registration-box">
          <h2>Create a New Account</h2>
          <form onSubmit={onSubmit} className="registration-form">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
            />
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      </div>
    );
};

export default RegistrationForm;