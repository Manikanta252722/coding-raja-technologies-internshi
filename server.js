const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Restaurant Schema (same as in loadData.js)
const restaurantSchema = new mongoose.Schema({
    id: String,
    name: String,
    url: String,
    location: {
        address: String,
        city: String,
        latitude: String,
        longitude: String,
    },
    cuisines: String,
    average_cost_for_two: Number,
    price_range: Number,
    user_rating: {
        aggregate_rating: String,
        rating_text: String,
        votes: String,
    },
    photos_url: String,
    menu_url: String,
    featured_image: String,
    has_online_delivery: Number,
    is_delivering_now: Number,
    has_table_booking: Number,
    deeplink: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Get Restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get List of Restaurants with Pagination
app.get('/api/restaurants', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const restaurants = await Restaurant.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
