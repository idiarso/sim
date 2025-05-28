const express = require("express");
const settingController = require("../controllers/setting.controller");

const router = express.Router();

// GET /api/v1/settings - Get all settings
router.get("/", settingController.getAllSettings);

// GET /api/v1/settings/:key - Get a single setting by key
router.get("/:key", settingController.getSettingByKey);

// PUT /api/v1/settings/:key - Update a setting
router.put("/:key", settingController.updateSetting);

// PUT /api/v1/settings - Update multiple settings
router.put("/", settingController.updateMultipleSettings);

module.exports = router;
