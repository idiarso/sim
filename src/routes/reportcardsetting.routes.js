const express = require('express');
const router = express.Router();
const reportCardSettingController = require('../controllers/reportcardsetting.controller');

// Create a new report card setting
router.post('/', reportCardSettingController.create);

// Get all report card settings
router.get('/', reportCardSettingController.findAll);

// Get report card setting by academic year and semester
router.get('/academic-year/:academic_year_id/semester/:semester_id', reportCardSettingController.findBySemester);

// Get a single report card setting by ID
router.get('/:id', reportCardSettingController.findOne);

// Update a report card setting
router.put('/:id', reportCardSettingController.update);

// Delete a report card setting
router.delete('/:id', reportCardSettingController.delete);

module.exports = router;
