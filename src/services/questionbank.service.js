const db = require("../models");
const QuestionBank = db.QuestionBank;
const TeacherProfile = db.TeacherProfile;
const Subject = db.Subject;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;
const Question = db.Question;

/**
 * Get all question banks
 */
const getAllQuestionBanks = async (filters = {}) => {
  try {
    // TODO: Implement filtering based on teacher, subject, level, etc.
    return await QuestionBank.findAll({
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
  } catch (error) {
    console.error("Error fetching all question banks:", error);
    throw error;
  }
};

/**
 * Get a single question bank by ID with questions
 */
const getQuestionBankById = async (bankId) => {
  try {
    const bank = await QuestionBank.findByPk(bankId, {
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: AcademicYear },
        { model: Semester },
        { model: Question } // Include associated questions
      ]
    });
    if (!bank) {
      throw new Error("Question bank not found");
    }
    return bank;
  } catch (error) {
    console.error(`Error fetching question bank ${bankId}:`, error);
    throw error;
  }
};

/**
 * Create a new question bank
 */
const createQuestionBank = async (bankData) => {
  try {
    // Validate relationships
    if (bankData.bank_guru_id) {
      const teacher = await TeacherProfile.findByPk(bankData.bank_guru_id);
      if (!teacher) throw new Error("Teacher not found");
    }
    if (bankData.bank_mapel_id) {
      const subject = await Subject.findByPk(bankData.bank_mapel_id);
      if (!subject) throw new Error("Subject not found");
    }
    if (bankData.id_tp) {
      const academicYear = await AcademicYear.findByPk(bankData.id_tp);
      if (!academicYear) throw new Error("Academic year not found");
    }
    if (bankData.id_smt) {
      const semester = await Semester.findByPk(bankData.id_smt);
      if (!semester) throw new Error("Semester not found");
    }
    // TODO: Validate bank_jenis_id, bank_jurusan_id if models exist

    const newBank = await QuestionBank.create(bankData);
    
    // Return the created bank with associations
    return await QuestionBank.findByPk(newBank.id_bank, {
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
  } catch (error) {
    console.error("Error creating question bank:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(`Question bank with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Update an existing question bank
 */
const updateQuestionBank = async (bankId, updateData) => {
  try {
    const bank = await QuestionBank.findByPk(bankId);
    if (!bank) {
      throw new Error("Question bank not found");
    }

    // Validate relationships if they are being updated
    if (updateData.bank_guru_id) {
      const teacher = await TeacherProfile.findByPk(updateData.bank_guru_id);
      if (!teacher) throw new Error("Teacher not found");
    }
    if (updateData.bank_mapel_id) {
      const subject = await Subject.findByPk(updateData.bank_mapel_id);
      if (!subject) throw new Error("Subject not found");
    }
    if (updateData.id_tp) {
      const academicYear = await AcademicYear.findByPk(updateData.id_tp);
      if (!academicYear) throw new Error("Academic year not found");
    }
    if (updateData.id_smt) {
      const semester = await Semester.findByPk(updateData.id_smt);
      if (!semester) throw new Error("Semester not found");
    }

    await bank.update(updateData);
    
    // Return the updated bank with associations
    return await QuestionBank.findByPk(bankId, {
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
  } catch (error) {
    console.error(`Error updating question bank ${bankId}:`, error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(`Question bank with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Delete a question bank
 */
const deleteQuestionBank = async (bankId) => {
  try {
    const bank = await QuestionBank.findByPk(bankId);
    if (!bank) {
      throw new Error("Question bank not found");
    }
    
    // TODO: Consider implications - delete associated questions? Check if used in schedules?
    await bank.destroy();
    return { message: "Question bank deleted successfully" };
  } catch (error) {
    console.error(`Error deleting question bank ${bankId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllQuestionBanks,
  getQuestionBankById,
  createQuestionBank,
  updateQuestionBank,
  deleteQuestionBank
};
