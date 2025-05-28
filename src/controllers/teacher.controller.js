const teacherService = require("../services/teacher.service");

/**
 * Get all teachers
 */
const getAllTeachers = async (req, res) => {
  try {
    // TODO: Add authorization check
    const teachers = await teacherService.getAllTeachers();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single teacher by ID
 */
const getTeacherById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const teacherId = req.params.id;
    const teacher = await teacherService.getTeacherById(teacherId);
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new teacher
 */
const createTeacher = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const newTeacher = await teacherService.createTeacher(req.body);
    res.status(201).json({ success: true, data: newTeacher });
  } catch (error) {
    if (error.message.includes("already exists") || error.message === "User not found") {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing teacher
 */
const updateTeacher = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const teacherId = req.params.id;
    const updatedTeacher = await teacherService.updateTeacher(teacherId, req.body);
    res.status(200).json({ success: true, data: updatedTeacher });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a teacher
 */
const deleteTeacher = async (req, res) => {
  try {
    // TODO: Add authorization check
    const teacherId = req.params.id;
    const result = await teacherService.deleteTeacher(teacherId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
