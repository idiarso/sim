const db = require("../models");
const Class = db.Class;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;
const TeacherProfile = db.TeacherProfile;

/**
 * Get all classes
 */
const getAllClasses = async () => {
  try {
    return await Class.findAll({
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: TeacherProfile }
      ]
    });
  } catch (error) {
    console.error("Error fetching all classes:", error);
    throw error;
  }
};

/**
 * Get a single class by ID
 */
const getClassById = async (classId) => {
  try {
    const classData = await Class.findByPk(classId, {
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: TeacherProfile }
      ]
    });
    if (!classData) {
      throw new Error("Class not found");
    }
    return classData;
  } catch (error) {
    console.error(`Error fetching class ${classId}:`, error);
    throw error;
  }
};

/**
 * Create a new class
 */
const createClass = async (classData) => {
  try {
    // Validate required relationships
    if (classData.id_tp) {
      const academicYear = await AcademicYear.findByPk(classData.id_tp);
      if (!academicYear) {
        throw new Error("Academic year not found");
      }
    }
    
    if (classData.id_smt) {
      const semester = await Semester.findByPk(classData.id_smt);
      if (!semester) {
        throw new Error("Semester not found");
      }
    }
    
    if (classData.guru_id) {
      const teacher = await TeacherProfile.findByPk(classData.guru_id);
      if (!teacher) {
        throw new Error("Teacher not found");
      }
    }
    
    const newClass = await Class.create(classData);
    
    // Get the created class with related data
    const createdClass = await Class.findByPk(newClass.id_kelas, {
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: TeacherProfile }
      ]
    });
    
    return createdClass;
  } catch (error) {
    console.error("Error creating class:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(`Class with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Update an existing class
 */
const updateClass = async (classId, updateData) => {
  try {
    const classData = await Class.findByPk(classId);
    if (!classData) {
      throw new Error("Class not found");
    }
    
    // Validate relationships if they're being updated
    if (updateData.id_tp) {
      const academicYear = await AcademicYear.findByPk(updateData.id_tp);
      if (!academicYear) {
        throw new Error("Academic year not found");
      }
    }
    
    if (updateData.id_smt) {
      const semester = await Semester.findByPk(updateData.id_smt);
      if (!semester) {
        throw new Error("Semester not found");
      }
    }
    
    if (updateData.guru_id) {
      const teacher = await TeacherProfile.findByPk(updateData.guru_id);
      if (!teacher) {
        throw new Error("Teacher not found");
      }
    }
    
    await classData.update(updateData);
    
    // Get the updated class with related data
    const updatedClass = await Class.findByPk(classId, {
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: TeacherProfile }
      ]
    });
    
    return updatedClass;
  } catch (error) {
    console.error(`Error updating class ${classId}:`, error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(`Class with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Delete a class
 */
const deleteClass = async (classId) => {
  try {
    const classData = await Class.findByPk(classId);
    if (!classData) {
      throw new Error("Class not found");
    }
    
    // TODO: Consider implications - delete associated records? Check for students?
    await classData.destroy();
    return { message: "Class deleted successfully" };
  } catch (error) {
    console.error(`Error deleting class ${classId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};
