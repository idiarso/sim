const db = require("../models");
const ExamResult = db.ExamResult;
const StudentProfile = db.StudentProfile;
const ExamSchedule = db.ExamSchedule;
const QuestionBank = db.QuestionBank;
const Subject = db.Subject;
const StudentQuestion = db.StudentQuestion;

/**
 * Get exam results for a specific schedule
 */
const getResultsBySchedule = async (scheduleId) => {
  try {
    // Verify schedule exists
    const schedule = await ExamSchedule.findByPk(scheduleId);
    if (!schedule) throw new Error("Exam schedule not found");

    return await ExamResult.findAll({
      where: { id_jadwal: scheduleId },
      include: [
        { model: StudentProfile, attributes: { exclude: ["password"] } },
        { 
          model: ExamSchedule, 
          include: [
            { model: QuestionBank, include: [{ model: Subject }] }
          ]
        }
      ]
    });
  } catch (error) {
    console.error(`Error fetching results for schedule ${scheduleId}:`, error);
    throw error;
  }
};

/**
 * Get exam result for a specific student and schedule
 */
const getStudentResult = async (studentId, scheduleId) => {
  try {
    const result = await ExamResult.findOne({
      where: { id_siswa: studentId, id_jadwal: scheduleId },
      include: [
        { model: StudentProfile, attributes: { exclude: ["password"] } },
        { 
          model: ExamSchedule, 
          include: [
            { model: QuestionBank, include: [{ model: Subject }] }
          ]
        }
      ]
    });
    if (!result) {
      throw new Error("Exam result not found for this student and schedule");
    }
    return result;
  } catch (error) {
    console.error(`Error fetching result for student ${studentId}, schedule ${scheduleId}:`, error);
    throw error;
  }
};

/**
 * Get detailed answers for manual grading (essays)
 */
const getAnswersForGrading = async (scheduleId, studentId = null) => {
  try {
    const whereClause = {
      id_jadwal: scheduleId,
      jenis_soal: 5, // Essay type
      nilai_otomatis: { [db.Sequelize.Op.ne]: 1 } // Not manually graded yet (assuming 1 means graded)
    };
    if (studentId) {
      whereClause.id_siswa = studentId;
    }

    return await StudentQuestion.findAll({
      where: whereClause,
      include: [
        { model: db.Question }, // Include question text
        { model: StudentProfile, attributes: ["nama_siswa"] } // Include student name
      ],
      order: [["id_siswa", "ASC"], ["no_soal_alias", "ASC"]]
    });
  } catch (error) {
    console.error(`Error fetching answers for grading schedule ${scheduleId}:`, error);
    throw error;
  }
};

/**
 * Save manual grade for an essay question
 */
const saveManualGrade = async (studentQuestionId, score) => {
  try {
    const studentQuestion = await StudentQuestion.findByPk(studentQuestionId);
    if (!studentQuestion) {
      throw new Error("Student question record not found");
    }
    if (studentQuestion.jenis_soal !== 5) {
      throw new Error("This question is not an essay question");
    }

    // Validate score (e.g., ensure it's within possible points)
    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > parseFloat(studentQuestion.point_soal)) {
        throw new Error(`Invalid score. Must be between 0 and ${studentQuestion.point_soal}`);
    }

    // Update the score and mark as manually graded
    await studentQuestion.update({ 
        nilai_koreksi: numericScore.toString(), 
        nilai_otomatis: 1 // Mark as manually graded
    });

    // Recalculate total score for the student
    await recalculateTotalScore(studentQuestion.id_siswa, studentQuestion.id_jadwal);

    return { success: true, message: "Grade saved successfully" };

  } catch (error) {
    console.error(`Error saving manual grade for ${studentQuestionId}:`, error);
    throw error;
  }
};

// Helper to recalculate total score after manual grading
const recalculateTotalScore = async (studentId, scheduleId) => {
  try {
    const allAnswers = await StudentQuestion.findAll({
      where: { id_siswa: studentId, id_jadwal: scheduleId }
    });

    let totalScore = 0;
    let essayScore = 0;
    let allGraded = true;

    allAnswers.forEach(ans => {
      const score = parseFloat(ans.nilai_koreksi);
      if (!isNaN(score)) {
        totalScore += score;
        if (ans.jenis_soal === 5) {
          essayScore += score;
        }
      } else if (ans.jenis_soal === 5) {
        // If an essay is not graded, mark as not fully graded
        allGraded = false;
      }
    });

    const result = await ExamResult.findOne({ where: { id_siswa: studentId, id_jadwal: scheduleId } });
    if (result) {
      await result.update({
        total_nilai: totalScore,
        essai_nilai: essayScore,
        dikoreksi: allGraded ? 1 : 0 // 1 if all essays graded, 0 otherwise
      });
    }
  } catch (error) {
    console.error(`Error recalculating score for student ${studentId}, schedule ${scheduleId}:`, error);
  }
};

module.exports = {
  getResultsBySchedule,
  getStudentResult,
  getAnswersForGrading,
  saveManualGrade
};
