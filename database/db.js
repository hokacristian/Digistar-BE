const mongoose = require('mongoose');
const uri = "mongodb+srv://user:user123@cluster0.gjmpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

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
