const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
