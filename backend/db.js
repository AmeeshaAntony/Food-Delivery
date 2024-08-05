const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofood:Ameesha@cluster0.fabowzw.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');

        const db = mongoose.connection.db;
        const foodItemsCollection = db.collection('food_items');
        const foodCategoryCollection = db.collection('foodCategory');

        // Use async/await for MongoDB queries
        const foodItems = await foodItemsCollection.find({}).toArray();
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        global.food_items = foodItems;
        global.foodCategory = foodCategories;

        console.log('Data loaded into global variables.');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
