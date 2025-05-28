const express = require('express');
const router = express.Router();
const examTypeController = require('../controllers/examtype.controller');

// Create a new exam type
router.post('/', examTypeController.create);

// Get all exam types with filtering and pagination
router.get('/', examTypeController.findAll);

// Get a single exam type by ID
router.get('/:id', examTypeController.findOne);

// Update an exam type
router.put('/:id', examTypeController.update);

// Delete an exam type
router.delete('/:id', examTypeController.delete);

// Toggle active status of an exam type
router.put('/:id/toggle-active', examTypeController.toggleActive);

module.exports = router;
