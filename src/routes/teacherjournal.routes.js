const express = require('express');
const router = express.Router();
const teacherJournalController = require('../controllers/teacherjournal.controller');

// Create a new journal entry
router.post('/', teacherJournalController.create);

// Get all journal entries with pagination and filtering
router.get('/', teacherJournalController.findAll);

// Get a single journal entry by ID
router.get('/:id', teacherJournalController.findOne);

// Update a journal entry
router.put('/:id', teacherJournalController.update);

// Delete a journal entry
router.delete('/:id', teacherJournalController.delete);

// Get teacher journal summary for reporting
router.get('/summary/report', teacherJournalController.getJournalSummary);

module.exports = router;
