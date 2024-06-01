// Dashboard.js
import React from 'react';
import AlertOverTimeChart from './AlertOverTimeChart';
import AlertSeverityChart from './AlertSeverityChart';
import TopSourceIPsChart from './TopSourceIPsChart';
import ProtocolDistributionChart from './ProtocolDistributionChart';
import CategoryDistributionChart from './CategoryDistributionChart';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ data }) => {
  // Calculate statistics

  const totalAlerts = data.length;
  const totalLowSeverity = data.filter(entry => entry.alert && entry.alert.severity === 1).length;
  const totalMediumSeverity = data.filter(entry => entry.alert && entry.alert.severity === 2).length;
  const totalHighSeverity = data.filter(entry => entry.alert && entry.alert.severity === 3).length;
  const totalUniqueIPs = new Set(data.map(entry => entry.src_ip)).size;

  // Calculate total alerts by UDP and TCP
  const totalAlertsUDP = data.filter(entry => entry.proto === 'UDP').length;
  const totalAlertsTCP = data.filter(entry => entry.proto === 'TCP').length;

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <div className="chart-label">Alert Severity Distribution</div>
        <AlertSeverityChart data={data} />
        <div className="stats">
          <p>Total Low Severity: {totalLowSeverity}</p>
          <p>Total Medium Severity: {totalMediumSeverity}</p>
          <p>Total High Severity: {totalHighSeverity}</p>
        </div>
      </div>
      <div className="chart-container">
        <ProtocolDistributionChart data={data} />
        <div className="stats">
          <p>Total Alerts by UDP: {totalAlertsUDP}</p>
          <p>Total Alerts by TCP: {totalAlertsTCP}</p>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-label">Top Source IPs</div>
        <TopSourceIPsChart data={data} />
        <div className="stats">
          <p>Total Unique Source IPs: {totalUniqueIPs}</p>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-label">Alerts Over Time</div>
        <AlertOverTimeChart data={data} />
        <div className="stats">
          <p>Total Alerts: {totalAlerts}</p>
        </div>
      </div>
      <div className="chart-container">
        <CategoryDistributionChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
