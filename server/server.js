const express = require('express');
const cors = require('cors');
import dotenv from 'dotenv';

const HttpError = require('./models/http-error');

dotenv.config();

const app = express();
app.use(cors());

// Connect Database

// Init Middleware - app.use()
app.use(express.json());

// Define Routes
app.use('/api/items', require('./routes/items-routes'));
app.use('/api/user', require('./routes/user-routes'));

// Will execute if no routes where found
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Will execute if any previous middleware throws error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Start Node + Express server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
