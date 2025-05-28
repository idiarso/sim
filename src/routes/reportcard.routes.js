const express = require('express');
const router = express.Router();
const reportCardController = require('../controllers/reportcard.controller');

// Generate report cards for a class
router.post('/generate', reportCardController.generateClassReportCards);

// Get all report cards with filtering and pagination
router.get('/', reportCardController.findAll);

// Get a single report card by ID with all related data
router.get('/:id', reportCardController.findOne);

// Update report card data
router.put('/:id', reportCardController.update);

// Set report card as final
router.put('/:id/finalize', reportCardController.setFinal);

// Calculate class rankings
router.get('/rankings/calculate', reportCardController.calculateRankings);

// Add subject grade to report card
router.post('/:report_card_id/subjects', reportCardController.addSubjectGrade);

// Update subject grade
router.put('/subjects/:id', reportCardController.updateSubjectGrade);

// Get a student's complete academic record (for student book/buku induk)
router.get('/students/:student_id/record', reportCardController.getStudentRecord);

module.exports = router;
