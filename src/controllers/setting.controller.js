const settingService = require("../services/setting.service");

/**
 * Get all application settings
 */
const getAllSettings = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., admin only)
    const settings = await settingService.getAllSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single setting by key
 */
const getSettingByKey = async (req, res) => {
  try {
    // TODO: Add authorization check
    const key = req.params.key;
    const setting = await settingService.getSettingByKey(key);
    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    if (error.message === "Setting not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update a setting
 */
const updateSetting = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., admin only)
    // TODO: Add input validation
    const key = req.params.key;
    const { value } = req.body;

    if (value === undefined) {
        return res.status(400).json({ success: false, message: "Value is required" });
    }

    const updatedSetting = await settingService.updateSetting(key, value);
    res.status(200).json({ success: true, data: updatedSetting });
  } catch (error) {
    if (error.message === "Setting not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update multiple settings
 */
const updateMultipleSettings = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., admin only)
    // TODO: Add input validation (ensure req.body is an array of {key, value})
    const settingsData = req.body;
    if (!Array.isArray(settingsData)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of settings" });
    }
    
    const results = await settingService.updateMultipleSettings(settingsData);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllSettings,
  getSettingByKey,
  updateSetting,
  updateMultipleSettings
};
