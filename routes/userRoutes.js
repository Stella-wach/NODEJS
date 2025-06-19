const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");

router.post('/user', userController.registerUser);
router.post('/user', userController.loginUser);


module.exports = router;