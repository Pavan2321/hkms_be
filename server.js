const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const loggerRoutes = require('./routes/loggerRoutes')

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS Middleware
app.use(cors()); // This will allow access from any origin

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/loggers", loggerRoutes)

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
