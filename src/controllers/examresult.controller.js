const examResultService = require("../services/examresult.service");

/**
 * Get exam results for a specific schedule
 */
const getResultsBySchedule = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher/admin)
    const scheduleId = req.params.scheduleId;
    const results = await examResultService.getResultsBySchedule(scheduleId);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    if (error.message === "Exam schedule not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get exam result for a specific student and schedule
 */
const getStudentResult = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., student/teacher/admin)
    const studentId = req.params.studentId;
    const scheduleId = req.params.scheduleId;
    const result = await examResultService.getStudentResult(studentId, scheduleId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.message === "Exam result not found for this student and schedule") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get essay answers needing manual grading for a schedule (optionally for a specific student)
 */
const getAnswersForGrading = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher/admin)
    const scheduleId = req.params.scheduleId;
    const studentId = req.query.studentId; // Optional query parameter
    const answers = await examResultService.getAnswersForGrading(scheduleId, studentId);
    res.status(200).json({ success: true, data: answers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Save manual grade for a specific student's essay answer
 */
const saveManualGrade = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher/admin)
    // TODO: Add input validation for score
    const studentQuestionId = req.params.studentQuestionId;
    const { score } = req.body;

    if (score === undefined) {
        return res.status(400).json({ success: false, message: "Score is required" });
    }

    const result = await examResultService.saveManualGrade(studentQuestionId, score);
    res.status(200).json(result);

  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("not an essay") || error.message.includes("Invalid score")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getResultsBySchedule,
  getStudentResult,
  getAnswersForGrading,
  saveManualGrade
};
