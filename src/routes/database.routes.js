const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/database.controller');

// Create a database backup
router.post('/backup', databaseController.backup);

// Restore database from backup
router.post('/restore', databaseController.restore);

// Get list of backup files
router.get('/backups', databaseController.getBackups);

// Delete a backup file
router.delete('/backup', databaseController.deleteBackup);

// Download a backup file
router.get('/backup/download', databaseController.downloadBackup);

module.exports = router;
