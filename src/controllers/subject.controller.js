const subjectService = require("../services/subject.service");

/**
 * Get all subjects
 */
const getAllSubjects = async (req, res) => {
  try {
    // TODO: Add authorization check
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single subject by ID
 */
const getSubjectById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const subjectId = req.params.id;
    const subject = await subjectService.getSubjectById(subjectId);
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    if (error.message === "Subject not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new subject
 */
const createSubject = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const newSubject = await subjectService.createSubject(req.body);
    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing subject
 */
const updateSubject = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const subjectId = req.params.id;
    const updatedSubject = await subjectService.updateSubject(subjectId, req.body);
    res.status(200).json({ success: true, data: updatedSubject });
  } catch (error) {
    if (error.message === "Subject not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a subject
 */
const deleteSubject = async (req, res) => {
  try {
    // TODO: Add authorization check
    const subjectId = req.params.id;
    const result = await subjectService.deleteSubject(subjectId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Subject not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "Subject cannot be deleted") {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};
