import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../services/auth';
import { formatDate, calculateAge } from '../../utils/dateUtils';
import './DashboardStyles.css';

const Dashboard = () => {
    const [babies, setBabies] = useState([]);
    const [selectedBaby, setSelectedBaby] = useState(null);
    const navigate = useNavigate();

    const handleSelectBaby = (baby) => {
        setSelectedBaby(baby);
    };

    const handleAddBaby = () => {
        navigate('/add-baby');
    };

    const handleBabyDashboard = () => {
        navigate(`/baby-dashboard/${selectedBaby.id}`);
    };

    useEffect(() => {
        const fetchBabies = async () => {
            try{
                const config = {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                };
                const res = await axios.get('/api/baby/user/babies', config);
                setBabies(res.data);
            }catch(error){
                console.error('Error fetching babies', error.response?.data);
            }
        };
        fetchBabies();
    }, []);

    return(
        <div className="user-dashboard">
            <div className="baby-list">
                <h2>Babies:</h2>
                <ul>
                {babies.map((baby) => (
                    <li key={baby.id} onClick={() => handleSelectBaby(baby)}>
                    {baby.babyName}
                    </li>
                ))}
                </ul>
                <button onClick={handleAddBaby} classname="add-baby-button">Add a new baby</button>
            </div>
            <div className="baby-info">
                {selectedBaby ? (
                <div>
                    <h2>Quick Information</h2>
                    <p>Name: {selectedBaby.babyName}</p>
                    <p>Age: {calculateAge(selectedBaby.birthDate)}</p>
                    <p>Dob: {formatDate(selectedBaby.birthDate)}</p>
                    {/* Display more information about the selected baby */}
                    <button onClick={handleBabyDashboard} classname="baby-dashboard-button">More Information</button>
                </div>

                ) : (
                <p>Select a baby to see their information</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;