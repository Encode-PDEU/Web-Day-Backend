const express = require('express');
const router = express.Router();

const {
    createUser
} = require('../Controllers/userController')

router.post('/create', createUser)

module.exports = router