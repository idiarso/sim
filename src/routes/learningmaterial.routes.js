const express = require('express');
const router = express.Router();
const learningMaterialController = require('../controllers/learningmaterial.controller');

// Create a new learning material
router.post('/', learningMaterialController.create);

// Get all learning materials with filtering and pagination
router.get('/', learningMaterialController.findAll);

// Get a single learning material by ID
router.get('/:id', learningMaterialController.findOne);

// Update a learning material
router.put('/:id', learningMaterialController.update);

// Delete a learning material
router.delete('/:id', learningMaterialController.delete);

// Publish a learning material
router.put('/:id/publish', learningMaterialController.publish);

// Unpublish a learning material
router.put('/:id/unpublish', learningMaterialController.unpublish);

module.exports = router;
