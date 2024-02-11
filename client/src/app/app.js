import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegistrationForm';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard'
import BabyRegistration from '../components/BabyRegistration';


function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/add-baby" element={<ProtectedRoute><BabyRegistration /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;