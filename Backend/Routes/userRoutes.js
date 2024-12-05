const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    clearUsers
} = require('../Controllers/userController')

router.post('/create', createUser)
router.get('/', getAllUsers);
router.delete('/clear', clearUsers);

module.exports = router