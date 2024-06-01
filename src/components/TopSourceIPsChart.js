import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TopSourceIPsChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const topSourceIPs = {};
    data.forEach(entry => {
      if (topSourceIPs[entry.src_ip]) {
        topSourceIPs[entry.src_ip]++;
      } else {
        topSourceIPs[entry.src_ip] = 1;
      }
    });

    const sortedIPs = Object.keys(topSourceIPs).sort((a, b) => topSourceIPs[b] - topSourceIPs[a]).slice(0, 10);

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedIPs,
        datasets: [{
          label: 'Top Source IPs',
          data: sortedIPs.map(ip => topSourceIPs[ip]),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
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
              text: 'Source IP'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default TopSourceIPsChart;