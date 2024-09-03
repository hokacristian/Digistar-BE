
const mongoose = require('mongoose');
const uri = "mongodb+srv://user:user123@cluster0.gjmpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Function to test connection to MongoDB
async function connectDB() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

// Function to close the MongoDB connection
async function closeDB() {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (err) {
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

module.exports = {
    connectDB,
    closeDB
};