const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);


module.exports = router;