import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from '../components/auth/RegistrationForm';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegistrationForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;