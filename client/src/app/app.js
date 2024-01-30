import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegistrationForm';
import Dashboard from '../components/Dashboard'
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;