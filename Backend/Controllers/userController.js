const User = require('../Models/userModel'); 

const createUser = async (req, res) => {
    try {
        const { name, rollNo, score } = req.body;

        const newUser = new User({
            name,
            rollNo,
            score
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }
};

// Return all users (Leaderboard)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ score: -1 }); // Sorting by score in descending order
        res.status(200).json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
};

// Clear all users
const clearUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({
            message: 'All users cleared successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to clear users',
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    clearUsers,
    getAllUsers
};
