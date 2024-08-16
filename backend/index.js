const express = require('express');
const cors = require('cors');
const app = express();
const mongoDB = require('./db');

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoDB(); // connect to MongoDB
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => { // Route to check if server is running
    res.send("Hello");
});
const orderRoutes = require('./Routes/OrderData');
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', orderRoutes);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
