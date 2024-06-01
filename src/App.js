import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      const jsonData = require('./data/transformedAlerts.json');
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
