const express = require('express');
const router = express.Router();
const classAttendanceController = require('../controllers/classattendance.controller');

// Create attendance records (bulk)
router.post('/bulk', classAttendanceController.createBulk);

// Get attendance records with pagination and filtering
router.get('/', classAttendanceController.findAll);

// Get attendance for a specific class on a specific date
router.get('/class/:class_id/date/:date', classAttendanceController.getClassAttendance);

// Update an attendance record
router.put('/:id', classAttendanceController.update);

// Get attendance summary for a student
router.get('/student/summary', classAttendanceController.getStudentAttendanceSummary);

module.exports = router;
