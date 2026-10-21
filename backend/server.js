require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
});

const port = process.env.PORT || 4000;
connectDatabase().then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`))).catch((error) => {
  console.error('Database connection failed:', error.message);
  process.exit(1);
});
