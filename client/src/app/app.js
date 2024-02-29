import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import RegistrationForm from '../components/auth/RegistrationForm';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard/Dashboard'
import BabyRegistration from '../components/BabyRegistration';
import BabyDashboard from '../components/BabyDashboard/BabyDashboard';

//function App(){
const App = () => {
    const NavigateToRegister = () => {
        const navigate = useNavigate();
        const handleNavigateToRegister = () => navigate('/register');
        return <LoginForm onNavigateToRegister={handleNavigateToRegister} />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigateToRegister />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/add-baby" element={<ProtectedRoute><BabyRegistration /></ProtectedRoute>} />
                    <Route path="/baby/:babyId" element={<BabyDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;