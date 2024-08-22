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

module.exports = {
    createUser
};
