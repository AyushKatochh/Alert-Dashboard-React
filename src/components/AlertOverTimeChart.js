import React from 'react';
import { Pie } from 'react-chartjs-2';

const AlertOverTimeChart = ({ data }) => {
  // Group data by alert category
  const categoryCounts = data.reduce((acc, entry) => {
    const category = entry.alert?.category || 'Unknown';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'Alert Categories',
      data: Object.values(categoryCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  return (
    <div style={{ marginBottom: '50px', position: 'relative', height: '50vh' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default AlertOverTimeChart;
