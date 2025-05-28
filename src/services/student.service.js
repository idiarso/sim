const db = require("../models");
const StudentProfile = db.StudentProfile;
const bcrypt = require("bcryptjs");

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Get all students
 */
const getAllStudents = async () => {
  try {
    return await StudentProfile.findAll();
  } catch (error) {
    console.error("Error fetching all students:", error);
    throw error;
  }
};

/**
 * Get a single student by ID
 */
const getStudentById = async (studentId) => {
  try {
    const student = await StudentProfile.findByPk(studentId);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    console.error(`Error fetching student ${studentId}:`, error);
    throw error;
  }
};

/**
 * Create a new student
 */
const createStudent = async (studentData) => {
  try {
    // Hash the password before saving
    const hashedPassword = await hashPassword(studentData.password);
    
    const newStudent = await StudentProfile.create({
      ...studentData,
      password: hashedPassword,
      // Ensure required fields like nisn, nis, username, kelas_awal are present
    });
    
    // Exclude password from the returned object
    const studentJson = newStudent.toJSON();
    delete studentJson.password;
    return studentJson;

  } catch (error) {
    console.error("Error creating student:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(`Student with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Update an existing student
 */
const updateStudent = async (studentId, updateData) => {
  try {
    const student = await StudentProfile.findByPk(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    // Hash password if it is being updated
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    await student.update(updateData);

    const updatedStudent = await StudentProfile.findByPk(studentId, {
      attributes: { exclude: ["password"] },
    });
    return updatedStudent;

  } catch (error) {
    console.error(`Error updating student ${studentId}:`, error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(`Student with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Delete a student
 */
const deleteStudent = async (studentId) => {
  try {
    const student = await StudentProfile.findByPk(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    // TODO: Consider implications - delete associated records (grades, exam data)? Soft delete?
    await student.destroy();
    return { message: "Student deleted successfully" };

  } catch (error) {
    console.error(`Error deleting student ${studentId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
