import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../services/auth';
import './LoginStyles.css';

const LoginForm = ({ onNavigateToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ email, password });
            const res = await axios.post('api/users/login', body, config);
            setAuthToken(res.data.token);
            navigate('/dashboard');
        }catch(err){
            console.error('Login failed: ', err.response.data);
        }
    };

    
    return (
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">Baby Bytes</h1>
            <form onSubmit={e => onSubmit(e)} className="login-form">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email"
                className="login-input"
              />
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password"
                className="login-input"
              />
              <button type="submit" className="login-button">Log In</button>
            </form>
            <div className="login-or">or</div>
            <button onClick={() => onNavigateToRegister()} className="signup-button">Sign up</button>
          </div>
        </div>
      );
};

export default LoginForm;