const examTakingService = require("../services/examtaking.service");

/**
 * Start an exam for the logged-in student
 */
const startExam = async (req, res) => {
  try {
    // TODO: Get studentId from authenticated user (req.user.studentId)
    const studentId = req.body.studentId; // Placeholder - replace with authenticated user ID
    const scheduleId = req.params.scheduleId;

    if (!studentId) {
        return res.status(401).json({ success: false, message: "Student not authenticated" });
    }

    const result = await examTakingService.startExam(studentId, scheduleId);
    res.status(200).json({ success: true, data: result });

  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("not available") || error.message.includes("already completed")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get questions for the student's current exam session
 */
const getExamQuestions = async (req, res) => {
  try {
    // TODO: Get studentId from authenticated user
    const studentId = req.body.studentId; // Placeholder
    const scheduleId = req.params.scheduleId;

    if (!studentId) {
        return res.status(401).json({ success: false, message: "Student not authenticated" });
    }

    // TODO: Verify student is actually taking this exam (check duration status)

    const questions = await examTakingService.getStudentExamQuestions(studentId, scheduleId);
    // TODO: Potentially filter question data before sending (e.g., remove correct answers)
    res.status(200).json({ success: true, data: questions });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Save a student's answer for a specific question
 */
const saveAnswer = async (req, res) => {
  try {
    // TODO: Get studentId from authenticated user
    const studentId = req.body.studentId; // Placeholder
    const scheduleId = req.params.scheduleId;
    const questionId = req.params.questionId;
    const { answer } = req.body;

    if (!studentId) {
        return res.status(401).json({ success: false, message: "Student not authenticated" });
    }
    if (answer === undefined) {
        return res.status(400).json({ success: false, message: "Answer is required" });
    }

    const result = await examTakingService.saveAnswer(studentId, scheduleId, questionId, answer);
    res.status(200).json(result);

  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("not currently in progress")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Finish the exam for the logged-in student
 */
const finishExam = async (req, res) => {
  try {
    // TODO: Get studentId from authenticated user
    const studentId = req.body.studentId; // Placeholder
    const scheduleId = req.params.scheduleId;

    if (!studentId) {
        return res.status(401).json({ success: false, message: "Student not authenticated" });
    }

    const result = await examTakingService.finishExam(studentId, scheduleId);
    res.status(200).json(result);

  } catch (error) {
    if (error.message.includes("not started or already finished")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  startExam,
  getExamQuestions,
  saveAnswer,
  finishExam
};
