// CategoryDistributionChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CategoryDistributionChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return; // Check if data is provided

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const categoryCounts = {};
    data.forEach(entry => {
      // Check if entry has the alert property
      if (entry.alert) {
        const category = entry.alert.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    const labels = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Alert Distribution by Category',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default CategoryDistributionChart;
