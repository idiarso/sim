const db = require("../models");
const ExamSchedule = db.ExamSchedule;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;
const QuestionBank = db.QuestionBank;
// const ExamType = db.ExamType; // Assuming ExamType model exists

/**
 * Get all exam schedules
 */
const getAllExamSchedules = async (filters = {}) => {
  try {
    // TODO: Implement filtering
    return await ExamSchedule.findAll({
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: QuestionBank }
        // { model: ExamType }
      ]
    });
  } catch (error) {
    console.error("Error fetching all exam schedules:", error);
    throw error;
  }
};

/**
 * Get a single exam schedule by ID
 */
const getExamScheduleById = async (scheduleId) => {
  try {
    const schedule = await ExamSchedule.findByPk(scheduleId, {
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: QuestionBank }
        // { model: ExamType }
      ]
    });
    if (!schedule) {
      throw new Error("Exam schedule not found");
    }
    return schedule;
  } catch (error) {
    console.error(`Error fetching exam schedule ${scheduleId}:`, error);
    throw error;
  }
};

/**
 * Create a new exam schedule
 */
const createExamSchedule = async (scheduleData) => {
  try {
    // Validate relationships
    if (scheduleData.id_tp) {
      const academicYear = await AcademicYear.findByPk(scheduleData.id_tp);
      if (!academicYear) throw new Error("Academic year not found");
    }
    if (scheduleData.id_smt) {
      const semester = await Semester.findByPk(scheduleData.id_smt);
      if (!semester) throw new Error("Semester not found");
    }
    if (scheduleData.id_bank) {
      const bank = await QuestionBank.findByPk(scheduleData.id_bank);
      if (!bank) throw new Error("Question bank not found");
    }
    // if (scheduleData.id_jenis) {
    //   const examType = await ExamType.findByPk(scheduleData.id_jenis);
    //   if (!examType) throw new Error("Exam type not found");
    // }

    const newSchedule = await ExamSchedule.create(scheduleData);
    
    // Return the created schedule with associations
    return await ExamSchedule.findByPk(newSchedule.id_jadwal, {
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: QuestionBank }
        // { model: ExamType }
      ]
    });
  } catch (error) {
    console.error("Error creating exam schedule:", error);
    throw error;
  }
};

/**
 * Update an existing exam schedule
 */
const updateExamSchedule = async (scheduleId, updateData) => {
  try {
    const schedule = await ExamSchedule.findByPk(scheduleId);
    if (!schedule) {
      throw new Error("Exam schedule not found");
    }

    // Validate relationships if they are being updated
    if (updateData.id_tp) {
      const academicYear = await AcademicYear.findByPk(updateData.id_tp);
      if (!academicYear) throw new Error("Academic year not found");
    }
    if (updateData.id_smt) {
      const semester = await Semester.findByPk(updateData.id_smt);
      if (!semester) throw new Error("Semester not found");
    }
    if (updateData.id_bank) {
      const bank = await QuestionBank.findByPk(updateData.id_bank);
      if (!bank) throw new Error("Question bank not found");
    }
    // if (updateData.id_jenis) {
    //   const examType = await ExamType.findByPk(updateData.id_jenis);
    //   if (!examType) throw new Error("Exam type not found");
    // }

    await schedule.update(updateData);
    
    // Return the updated schedule with associations
    return await ExamSchedule.findByPk(scheduleId, {
      include: [
        { model: AcademicYear },
        { model: Semester },
        { model: QuestionBank }
        // { model: ExamType }
      ]
    });
  } catch (error) {
    console.error(`Error updating exam schedule ${scheduleId}:`, error);
    throw error;
  }
};

/**
 * Delete an exam schedule
 */
const deleteExamSchedule = async (scheduleId) => {
  try {
    const schedule = await ExamSchedule.findByPk(scheduleId);
    if (!schedule) {
      throw new Error("Exam schedule not found");
    }
    
    // TODO: Consider implications - delete associated results, student attempts?
    await schedule.destroy();
    return { message: "Exam schedule deleted successfully" };
  } catch (error) {
    console.error(`Error deleting exam schedule ${scheduleId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllExamSchedules,
  getExamScheduleById,
  createExamSchedule,
  updateExamSchedule,
  deleteExamSchedule
};
