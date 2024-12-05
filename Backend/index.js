const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const promClient = require('prom-client');
const cors = require('cors');

const logger = require('./utils/logger')

dotenv.config();
const connectDB = require('./db'); 
connectDB()

const app = express();
app.use(express.json());
app.use(cors());

const http = require('http');
const server = http.createServer(app);

server.timeout = 60000; 

const questionRoutes = require('./Routes/questionRoutes');
app.use('/api', questionRoutes);

const userRoutes = require('./Routes/userRoutes')
app.use('/api', userRoutes);

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
