const studentService = require("../services/student.service");

/**
 * Get all students
 */
const getAllStudents = async (req, res) => {
  try {
    // TODO: Add authorization check
    const students = await studentService.getAllStudents();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single student by ID
 */
const getStudentById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new student
 */
const createStudent = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing student
 */
const updateStudent = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add input validation
    const studentId = req.params.id;
    const updatedStudent = await studentService.updateStudent(studentId, req.body);
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a student
 */
const deleteStudent = async (req, res) => {
  try {
    // TODO: Add authorization check
    const studentId = req.params.id;
    const result = await studentService.deleteStudent(studentId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
