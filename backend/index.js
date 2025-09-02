const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const servicesRouter = require('./routes/services');
app.use('/api/services', servicesRouter);

const requestsRouter = require('./routes/requests');
app.use('/api/requests', requestsRouter);

// --- Default Route ---
app.get('/', (req, res) => {
  res.send('SkillShareboard API is running!');
});

// --- MongoDB Connection and Server Start ---
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
    
    // Start the server ONLY after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process with an error code
  });

