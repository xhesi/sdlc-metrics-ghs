const express = require('express');
const { calculateMetrics, validateInput } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/version', (req, res) => {
  res.json({
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.ENVIRONMENT || 'development'
  });
});

app.post('/api/metrics', (req, res) => {
  const { deployments, failures } = req.body;

  if (!validateInput(deployments, failures)) {
    return res.status(400).json({ error: 'Invalid input: deployments and failures must be positive numbers' });
  }

  const metrics = calculateMetrics(deployments, failures);
  res.json(metrics);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
