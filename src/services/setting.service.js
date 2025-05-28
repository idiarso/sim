const db = require("../models");
const Setting = db.Setting;

/**
 * Get all application settings
 */
const getAllSettings = async () => {
  try {
    return await Setting.findAll();
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

/**
 * Get a single setting by key
 */
const getSettingByKey = async (key) => {
  try {
    const setting = await Setting.findOne({ where: { key: key } });
    if (!setting) {
      throw new Error("Setting not found");
    }
    return setting;
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    throw error;
  }
};

/**
 * Update a setting
 */
const updateSetting = async (key, value) => {
  try {
    const setting = await Setting.findOne({ where: { key: key } });
    if (!setting) {
      throw new Error("Setting not found");
    }
    
    await setting.update({ value: value });
    return setting;
  } catch (error) {
    console.error(`Error updating setting ${key}:`, error);
    throw error;
  }
};

/**
 * Update multiple settings at once
 */
const updateMultipleSettings = async (settingsData) => {
  try {
    const results = [];
    
    // Use transaction to ensure all updates succeed or none do
    await db.sequelize.transaction(async (t) => {
      for (const item of settingsData) {
        const { key, value } = item;
        const setting = await Setting.findOne({ 
          where: { key: key },
          transaction: t
        });
        
        if (setting) {
          await setting.update({ value: value }, { transaction: t });
          results.push({ key, value, status: 'updated' });
        } else {
          results.push({ key, status: 'not_found' });
        }
      }
    });
    
    return results;
  } catch (error) {
    console.error("Error updating multiple settings:", error);
    throw error;
  }
};

module.exports = {
  getAllSettings,
  getSettingByKey,
  updateSetting,
  updateMultipleSettings
};
