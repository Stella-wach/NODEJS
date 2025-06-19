const Student = require('../models/studentModel'); // Use singular everywhere
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports = {
  // CREATE
  addStudents: async (req, res) => {
    try {
      const student = new Student(req.body);
      const result = await student.save(); // use the same variable
      res.send(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  // READ ALL
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.find({});
      res.send(students);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  // READ ONE
  getStudents: async (req, res, next) => {
    const id = req.params.id;
    try {
      const student = await Student.findById(id);
      if (!student) {
        throw createError(404, 'Student does not exist');
      }
      res.send(student);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid student ID'));
      }
      next(error);
    }
  },

  // UPDATE
  updateStudents: async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    try {
      const result = await Student.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createError(404, 'Student does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid student ID'));
      }
      next(error);
    }
  },

  // DELETE
  deleteStudents: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Student.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Student does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid student ID'));
      }
      next(error);
    }
  }
};
