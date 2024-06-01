// ProtocolDistributionChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProtocolDistributionChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const protocolCounts = {};
    data.forEach(entry => {
      const protocol = entry.proto;
      protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1;
    });

    const labels = Object.keys(protocolCounts);
    const counts = Object.values(protocolCounts);

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Alert Distribution by Protocol',
          data: counts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
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

export default ProtocolDistributionChart;
