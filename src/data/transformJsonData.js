const fs = require('fs');

// Read the data from the file
const rawData = fs.readFileSync('alerts.json', 'utf8');

// Split the data into lines and parse each line as a JSON object
const lines = rawData.trim().split('\n');
const alerts = lines.map(line => JSON.parse(line));

// Write the transformed data to a new file
fs.writeFileSync('transformedAlerts.json', JSON.stringify(alerts, null, 2));
