const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const loggerRoutes = require('./routes/loggerRoutes');
const userRoutes = require("./routes/userRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const serviceRoutes = require("./routes/servicesRoutes");
const http = require("http");
const socketIo = require("socket.io");
// require("./helpers/cron")

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);  // Create HTTP server
const io = socketIo(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    }
});

// Middleware
app.use(express.json());

// CORS Middleware
app.use(cors('*')); // This will allow access from any origin

// Make `io` accessible in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/loggers", loggerRoutes)
app.use("/api/users", userRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/services", serviceRoutes);

// Handle Socket.IO connections
// Listen for connection from clients
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Send a message to the client
    socket.emit('message', 'Welcome to the Socket.IO server');

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
