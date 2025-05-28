const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');

// Create a new assignment
router.post('/', assignmentController.create);

// Get all assignments with filtering and pagination
router.get('/', assignmentController.findAll);

// Get a single assignment by ID
router.get('/:id', assignmentController.findOne);

// Update an assignment
router.put('/:id', assignmentController.update);

// Delete an assignment
router.delete('/:id', assignmentController.delete);

// Publish an assignment
router.put('/:id/publish', assignmentController.publish);

// Unpublish an assignment
router.put('/:id/unpublish', assignmentController.unpublish);

// Get all submissions for an assignment
router.get('/:id/submissions', assignmentController.getSubmissions);

// Grade a submission
router.put('/submissions/:submissionId/grade', assignmentController.gradeSubmission);

module.exports = router;
