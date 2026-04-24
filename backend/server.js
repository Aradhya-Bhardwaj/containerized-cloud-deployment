const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Included for future DB connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running correctly from Docker!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
