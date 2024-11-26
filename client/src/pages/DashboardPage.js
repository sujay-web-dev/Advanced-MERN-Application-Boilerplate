// client/src/pages/DashboardPage.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';

function DashboardPage() {
  const [message, setMessage] = React.useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await api.get('/user/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    };
    fetchDashboard();
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}


export default DashboardPage;
