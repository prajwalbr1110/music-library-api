require('dotenv').config(); // Load environment variables
const express = require('express');
const { connectDB } = require('./config/database'); // Import database connection
const authRoutes = require('./routes/auth'); // Import authentication routes

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to PostgreSQL
connectDB();

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/v1/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//synchronize the models with your PostgreSQL database:
const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const Favorite = require('./models/Favorite');

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database tables synchronized');
});

const artistRoutes = require('./routes/artists');

app.use('/api/v1/artists', artistRoutes);

const albumRoutes = require('./routes/albums');

app.use('/api/v1/albums', albumRoutes);


const trackRoutes = require('./routes/tracks');
const favoriteRoutes = require('./routes/favorites');

app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/favorites', favoriteRoutes);

