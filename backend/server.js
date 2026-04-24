const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health route (so the Frontend knows we are connected!)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running correctly from Docker!' });
});

// The core business logic - we send strings from frontend to evaluate here
app.post('/api/calculate', (req, res) => {
  const { expression } = req.body;
  if (!expression) {
    return res.status(400).json({ error: 'No expression provided' });
  }

  try {
    // Sanitize to only allow numbers and mathematical operators to prevent injection
    const sanitized = expression.replace(/[^0-9+\-*/().]/g, '');
    if (!sanitized) throw new Error('Empty expression after sanitization');

    // For a simple project, eval is OK here since we heavily sanitized it
    const result = eval(sanitized);

    // Check if result is invalid (like dividing by zero)
    if (!isFinite(result) || isNaN(result)) {
      return res.status(400).json({ error: 'Invalid calculation' });
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
