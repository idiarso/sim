const classService = require("../services/class.service");

/**
 * Get all classes
 */
const getAllClasses = async (req, res) => {
  try {
    // TODO: Add authorization check
    const classes = await classService.getAllClasses();
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single class by ID
 */
const getClassById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const classId = req.params.id;
    const classData = await classService.getClassById(classId);
    res.status(200).json({ success: true, data: classData });
  } catch (error) {
    if (error.message === "Class not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new class
 */
const createClass = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const newClass = await classService.createClass(req.body);
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing class
 */
const updateClass = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const classId = req.params.id;
    const updatedClass = await classService.updateClass(classId, req.body);
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    if (error.message === "Class not found" || error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a class
 */
const deleteClass = async (req, res) => {
  try {
    // TODO: Add authorization check
    const classId = req.params.id;
    const result = await classService.deleteClass(classId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Class not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};
