const express = require('express');
const router = express.Router();
const teacherDutyController = require('../controllers/teacherduty.controller');

// Create a new teacher duty schedule
router.post('/', teacherDutyController.create);

// Get all teacher duty schedules with pagination and filtering
router.get('/', teacherDutyController.findAll);

// Get duty teachers for a specific day
router.get('/day', teacherDutyController.getDutyTeachersForDay);

// Get a single teacher duty schedule by ID
router.get('/:id', teacherDutyController.findOne);

// Update a teacher duty schedule
router.put('/:id', teacherDutyController.update);

// Delete a teacher duty schedule
router.delete('/:id', teacherDutyController.delete);

// Create duty schedules for a week (bulk)
router.post('/week-schedule', teacherDutyController.createWeekSchedule);

module.exports = router;
