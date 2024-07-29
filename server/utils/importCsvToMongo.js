



const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection string
const mongoURI = "mongodb://127.0.0.1:27017";
const dbName = "Aahar";
const collectionName = "restaurants";

(async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log('Connected to MongoDB');

    // Define the Restaurant Schema
    const restaurantSchema = new mongoose.Schema({
      has_online_delivery: Number,
      url: String,
      user_rating: {
        rating_text: String,
        rating_color: String,
        aggregate_rating: String,
        rating_obj: {
          title: {
            text: String
          }
        },
        votes: Number
      },
      name: String,
      cuisines: String,
      menu_url: String,
      average_cost_for_two: Number,
      location: {
        latitude: String,
        address: String,
        city: String,
        locality: String,
        locality_verbose: String,
        longitude: String,
        zipcode: String,
        country_id: String
      },
      featured_image: String,
      currency: String,
      id: String,
      thumb: String
    });

    const Restaurant = mongoose.model('Restaurant', restaurantSchema);

    // Correct path to the JSON file
    const filePath = path.join(__dirname, 'new_data.json');

    // Read the JSON file
    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }
      const jsonData = JSON.parse(data);

      // Insert data into the database
      try {
        await Restaurant.insertMany(jsonData.map(item => item.restaurant));
        console.log('Data successfully loaded');
      } catch (insertErr) {
        console.error('Error inserting data:', insertErr);
      } finally {
        mongoose.connection.close();
      }
    });
  } catch (connectErr) {
    console.error('Error connecting to MongoDB:', connectErr);
  }
})();
