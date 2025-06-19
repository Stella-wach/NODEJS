const express = require('express');
const routes = express.Router();
const studentController = require('../controller/studentController');



// GET all students
routes.get('/getAllStudents', studentController.getAllStudents );

//Get student by ID
routes.get('/getStudents/:id', studentController.getStudents);

// POST: add a student
routes.post('/addStudents', studentController.addStudents);

// PATCH: update a student
routes.patch('/updateStudents/:id', studentController.updateStudents);

// DELETE: remove a student
routes.delete('/deleteStudents/:id', studentController.deleteStudents);

module.exports = routes;


