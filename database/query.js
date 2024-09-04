const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = require('./schema');

const User = mongoose.model('users', schema.userSchema);

async function getAllUsers() {
    return await User.find();
}

async function getUserById(id) {
    return await User.findById(id);
}

async function createUser(user) {
    return await User.create(user);
}

async function updateUser(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
}

async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}

async function searchUserByName(name) {
    return await User.find({ name: name });
}

async function getUserByEmail(email) {
    return await User.findOne({ email: email });
}

async function registerUser({ name, age, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }
    return await createUser({ name, age, email, password });
}

async function loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    return { token, user };
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUserByName,
    getUserByEmail, 
    registerUser,
    loginUser
};
