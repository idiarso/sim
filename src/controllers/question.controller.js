const questionService = require("../services/question.service");

/**
 * Get all questions for a specific bank
 */
const getQuestionsByBank = async (req, res) => {
  try {
    // TODO: Add authorization check
    const bankId = req.params.bankId;
    const questions = await questionService.getQuestionsByBank(bankId);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    if (error.message === "Question bank not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single question by ID
 */
const getQuestionById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const questionId = req.params.id;
    const question = await questionService.getQuestionById(questionId);
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    if (error.message === "Question not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new question for a specific bank
 */
const createQuestion = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner teacher or admin)
    // TODO: Add input validation
    const bankId = req.params.bankId;
    const newQuestion = await questionService.createQuestion(bankId, req.body);
    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    if (error.message === "Question bank not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing question
 */
const updateQuestion = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner teacher or admin)
    // TODO: Add input validation
    const questionId = req.params.id;
    const updatedQuestion = await questionService.updateQuestion(questionId, req.body);
    res.status(200).json({ success: true, data: updatedQuestion });
  } catch (error) {
    if (error.message === "Question not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a question
 */
const deleteQuestion = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner teacher or admin)
    const questionId = req.params.id;
    const result = await questionService.deleteQuestion(questionId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Question not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getQuestionsByBank,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
};
