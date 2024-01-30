import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const ProtectedRoute = ({children}) => {
    if(isAuthenticated()){
        return children;
    }else{
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;