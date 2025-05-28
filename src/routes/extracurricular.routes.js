const express = require('express');
const router = express.Router();
const extracurricularController = require('../controllers/extracurricular.controller');

// Create a new extracurricular activity
router.post('/', extracurricularController.create);

// Get all extracurricular activities
router.get('/', extracurricularController.findAll);

// Get a single extracurricular activity by ID
router.get('/:id', extracurricularController.findOne);

// Update an extracurricular activity
router.put('/:id', extracurricularController.update);

// Delete an extracurricular activity
router.delete('/:id', extracurricularController.delete);

// Enroll students in an extracurricular activity
router.post('/enroll', extracurricularController.enrollStudents);

// Record attendance for extracurricular activity
router.post('/attendance', extracurricularController.recordAttendance);

// Get extracurricular attendance for a specific date
router.get('/:extracurricular_id/attendance/:date', extracurricularController.getAttendance);

// Get students enrolled in an extracurricular activity
router.get('/enrolled-students', extracurricularController.getEnrolledStudents);

module.exports = router;
