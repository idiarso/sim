const express = require('express');
const router = express.Router();
const schoolProfileController = require('../controllers/schoolprofile.controller');

// Get school profile
router.get('/', schoolProfileController.getProfile);

// Create school profile
router.post('/', schoolProfileController.createProfile);

// Update school profile
router.put('/:id', schoolProfileController.updateProfile);

// Upload school logo
router.post('/:id/logo', schoolProfileController.uploadLogo);

// Upload principal signature
router.post('/:id/signature', schoolProfileController.uploadSignature);

module.exports = router;
