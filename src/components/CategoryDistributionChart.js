import React from 'react';
import { Line } from 'react-chartjs-2';

const CategoryDistributionChart = ({ data }) => {
  // Group data by timestamp (hourly)
  const groupedData = data.reduce((acc, entry) => {
    const date = new Date(entry.timestamp);
    const hour = date.toISOString().split(':')[0]; // Get the hour part
    if (!acc[hour]) {
      acc[hour] = 0;
    }
    acc[hour] += 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [{
      label: 'Number of Alerts',
      data: Object.values(groupedData),
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Alerts'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Timestamp (hourly)'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  return (
    <div style={{ marginBottom: '50px', position: 'relative', height: '50vh' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CategoryDistributionChart;
