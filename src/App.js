import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/data/transformedAlerts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1 style={{'textAlign': 'center', 'marginBottom': '100px'}}>Alert Dashboard</h1>
      <Dashboard data={data} />
    </div>
  );
};

export default App;
