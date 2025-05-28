const db = require("../models");
const FinalGrade = db.FinalGrade;
const StudentProfile = db.StudentProfile;
const Subject = db.Subject;
const Class = db.Class;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;

/**
 * Get all final grades for a specific class, subject, academic year, and semester
 */
const getFinalGrades = async (classId, subjectId, academicYearId, semesterId) => {
  try {
    // Validate required parameters
    if (!classId || !subjectId || !academicYearId || !semesterId) {
      throw new Error("Missing required parameters");
    }

    // Verify entities exist
    const classData = await Class.findByPk(classId);
    if (!classData) throw new Error("Class not found");
    
    const subject = await Subject.findByPk(subjectId);
    if (!subject) throw new Error("Subject not found");
    
    const academicYear = await AcademicYear.findByPk(academicYearId);
    if (!academicYear) throw new Error("Academic year not found");
    
    const semester = await Semester.findByPk(semesterId);
    if (!semester) throw new Error("Semester not found");

    // Get all grades matching the criteria
    return await FinalGrade.findAll({
      where: {
        id_kelas: classId,
        id_mapel: subjectId,
        id_tp: academicYearId,
        id_smt: semesterId
      },
      include: [
        { model: StudentProfile, attributes: { exclude: ["password"] } },
        { model: Subject },
        { model: Class },
        { model: AcademicYear },
        { model: Semester }
      ],
      order: [["id_siswa", "ASC"]]
    });
  } catch (error) {
    console.error("Error fetching final grades:", error);
    throw error;
  }
};

/**
 * Get final grades for a specific student
 */
const getStudentFinalGrades = async (studentId, academicYearId, semesterId) => {
  try {
    // Validate required parameters
    if (!studentId || !academicYearId || !semesterId) {
      throw new Error("Missing required parameters");
    }

    // Verify student exists
    const student = await StudentProfile.findByPk(studentId);
    if (!student) throw new Error("Student not found");
    
    // Get all grades for the student
    return await FinalGrade.findAll({
      where: {
        id_siswa: studentId,
        id_tp: academicYearId,
        id_smt: semesterId
      },
      include: [
        { model: Subject },
        { model: Class },
        { model: AcademicYear },
        { model: Semester }
      ],
      order: [["id_mapel", "ASC"]]
    });
  } catch (error) {
    console.error(`Error fetching final grades for student ${studentId}:`, error);
    throw error;
  }
};

/**
 * Save or update a final grade
 */
const saveGrade = async (gradeData) => {
  try {
    // Validate required fields
    const requiredFields = ["id_siswa", "id_mapel", "id_kelas", "id_tp", "id_smt", "nilai"];
    for (const field of requiredFields) {
      if (!gradeData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Check if grade already exists
    const existingGrade = await FinalGrade.findOne({
      where: {
        id_siswa: gradeData.id_siswa,
        id_mapel: gradeData.id_mapel,
        id_kelas: gradeData.id_kelas,
        id_tp: gradeData.id_tp,
        id_smt: gradeData.id_smt
      }
    });

    if (existingGrade) {
      // Update existing grade
      await existingGrade.update({ nilai: gradeData.nilai });
      return existingGrade;
    } else {
      // Create new grade
      return await FinalGrade.create(gradeData);
    }
  } catch (error) {
    console.error("Error saving grade:", error);
    throw error;
  }
};

/**
 * Bulk save or update final grades
 */
const bulkSaveGrades = async (gradesData) => {
  try {
    if (!Array.isArray(gradesData) || gradesData.length === 0) {
      throw new Error("Invalid grades data");
    }

    const results = [];
    
    // Use transaction to ensure all updates succeed or none do
    await db.sequelize.transaction(async (t) => {
      for (const gradeData of gradesData) {
        // Validate required fields
        const requiredFields = ["id_siswa", "id_mapel", "id_kelas", "id_tp", "id_smt", "nilai"];
        for (const field of requiredFields) {
          if (!gradeData[field]) {
            throw new Error(`Missing required field: ${field} in one of the grade entries`);
          }
        }

        // Check if grade already exists
        const existingGrade = await FinalGrade.findOne({
          where: {
            id_siswa: gradeData.id_siswa,
            id_mapel: gradeData.id_mapel,
            id_kelas: gradeData.id_kelas,
            id_tp: gradeData.id_tp,
            id_smt: gradeData.id_smt
          },
          transaction: t
        });

        if (existingGrade) {
          // Update existing grade
          await existingGrade.update({ nilai: gradeData.nilai }, { transaction: t });
          results.push({ ...existingGrade.toJSON(), status: 'updated' });
        } else {
          // Create new grade
          const newGrade = await FinalGrade.create(gradeData, { transaction: t });
          results.push({ ...newGrade.toJSON(), status: 'created' });
        }
      }
    });
    
    return results;
  } catch (error) {
    console.error("Error bulk saving grades:", error);
    throw error;
  }
};

module.exports = {
  getFinalGrades,
  getStudentFinalGrades,
  saveGrade,
  bulkSaveGrades
};
