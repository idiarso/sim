const express = require('express');
const router = express.Router();
const studentPermissionController = require('../controllers/studentpermission.controller');

// Create a new student permission
router.post('/', studentPermissionController.create);

// Get all student permissions with pagination and filtering
router.get('/', studentPermissionController.findAll);

// Get a single student permission by ID
router.get('/:id', studentPermissionController.findOne);

// Update a student permission
router.put('/:id', studentPermissionController.update);

// Delete a student permission
router.delete('/:id', studentPermissionController.delete);

// Approve a student permission
router.put('/:id/approve', studentPermissionController.approve);

// Update parent confirmation
router.put('/:id/parent-confirmation', studentPermissionController.updateParentConfirmation);

// Get permissions for today that need approval
router.get('/pending/today', studentPermissionController.getTodayPendingPermissions);

module.exports = router;
