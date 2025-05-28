const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const db = require('../models');
const { Sequelize } = db;

// Convert exec to return a Promise
const execPromise = util.promisify(exec);

// Create backup directory if it doesn't exist
const backupDir = path.join(__dirname, '../../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Backup database
exports.backup = async (req, res) => {
  try {
    // Get database config from Sequelize
    const config = db.sequelize.config;
    const { database, username, password, host } = config;
    
    // Generate a timestamp for the backup file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${database}-${timestamp}.sql`;
    const backupFilePath = path.join(backupDir, backupFileName);
    
    // Command for MySQL/MariaDB backup
    const command = `mysqldump -h ${host} -u ${username} ${password ? `-p${password}` : ''} ${database} > "${backupFilePath}"`;
    
    // Execute the backup command
    await execPromise(command);
    
    // Check if the backup file was created successfully
    if (!fs.existsSync(backupFilePath)) {
      return res.status(500).json({
        success: false,
        message: 'Backup failed: Backup file was not created'
      });
    }
    
    // Get the file size
    const stats = fs.statSync(backupFilePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    
    return res.status(200).json({
      success: true,
      message: 'Database backup created successfully',
      data: {
        file_name: backupFileName,
        file_path: backupFilePath,
        size: `${fileSizeInMegabytes.toFixed(2)} MB`,
        timestamp: new Date()
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create database backup',
      error: error.message
    });
  }
};

// Restore database from backup
exports.restore = async (req, res) => {
  try {
    // Get the backup file path from the request
    const { file_path } = req.body;
    
    if (!file_path) {
      return res.status(400).json({
        success: false,
        message: 'Backup file path is required'
      });
    }
    
    // Check if the backup file exists
    if (!fs.existsSync(file_path)) {
      return res.status(404).json({
        success: false,
        message: 'Backup file not found'
      });
    }
    
    // Get database config from Sequelize
    const config = db.sequelize.config;
    const { database, username, password, host } = config;
    
    // Command for MySQL/MariaDB restore
    const command = `mysql -h ${host} -u ${username} ${password ? `-p${password}` : ''} ${database} < "${file_path}"`;
    
    // Execute the restore command
    await execPromise(command);
    
    return res.status(200).json({
      success: true,
      message: 'Database restored successfully',
      data: {
        file_path: file_path,
        timestamp: new Date()
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to restore database',
      error: error.message
    });
  }
};

// Get list of backup files
exports.getBackups = async (req, res) => {
  try {
    // Read the backup directory
    const files = fs.readdirSync(backupDir);
    
    // Filter and map only SQL backup files
    const backups = files
      .filter(file => file.endsWith('.sql'))
      .map(file => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          file_name: file,
          file_path: filePath,
          size: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
          created_at: stats.birthtime
        };
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date (newest first)
    
    return res.status(200).json({
      success: true,
      message: 'Backup files retrieved successfully',
      data: backups
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve backup files',
      error: error.message
    });
  }
};

// Delete a backup file
exports.deleteBackup = async (req, res) => {
  try {
    const { file_path } = req.body;
    
    if (!file_path) {
      return res.status(400).json({
        success: false,
        message: 'Backup file path is required'
      });
    }
    
    // Check if the backup file exists
    if (!fs.existsSync(file_path)) {
      return res.status(404).json({
        success: false,
        message: 'Backup file not found'
      });
    }
    
    // Delete the file
    fs.unlinkSync(file_path);
    
    return res.status(200).json({
      success: true,
      message: 'Backup file deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete backup file',
      error: error.message
    });
  }
};

// Download a backup file
exports.downloadBackup = async (req, res) => {
  try {
    const { file_path } = req.query;
    
    if (!file_path) {
      return res.status(400).json({
        success: false,
        message: 'Backup file path is required'
      });
    }
    
    // Check if the backup file exists
    if (!fs.existsSync(file_path)) {
      return res.status(404).json({
        success: false,
        message: 'Backup file not found'
      });
    }
    
    const fileName = path.basename(file_path);
    
    // Set response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/sql');
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(file_path);
    fileStream.pipe(res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to download backup file',
      error: error.message
    });
  }
};
