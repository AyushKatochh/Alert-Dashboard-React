import React from 'react';
import { Line } from 'react-chartjs-2';

const AlertOverTimeChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.timestamp),
    datasets: [{
      label: 'Alerts Over Time',
      data: data.map(entry => entry.alert_count),
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
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
          text: 'Timestamp'
        },
        ticks: {
          maxTicksLimit: 5,  // Limit number of x-axis labels
          maxRotation: 0,    // Prevent rotation on smaller screens
          minRotation: 0
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'  // Move the legend to the top
      }
    }
  };

  return (
    <div style={{ marginBottom: '50px', position: 'relative', height: '50vh' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AlertOverTimeChart;
