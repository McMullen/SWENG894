import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardStyles.css';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../services/auth';

const Dashboard = () => {
    const [babies, setBabies] = useState([]);
    const [selectedBaby, setSelectedBaby] = useState(null);
    const navigate = useNavigate();

    const handleAddBaby = () => {
        navigate('/add-baby');
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
        <div className="dashboard-container">
            <main className="dashboard-main">
                <aside className="baby-list">
                    <h2>Babies:</h2>
                    <ul>
                        {babies.map((baby) => (
                            <li key={baby.id} onClick={() => navigate(`/baby/${baby.id}`)}>
                                {baby.babyName}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAddBaby}>Add a new Baby</button>
                </aside>
                <section className="baby-info">
                    <h2>Baby Information</h2>
                    {/* Display information of the selected baby here */}
                    {selectedBaby && <p>{selectedBaby.babyName} {/* other info */}</p>}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;