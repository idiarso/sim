const questionBankService = require("../services/questionbank.service");

/**
 * Get all question banks
 */
const getAllQuestionBanks = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add filtering based on req.query
    const banks = await questionBankService.getAllQuestionBanks(req.query);
    res.status(200).json({ success: true, data: banks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single question bank by ID
 */
const getQuestionBankById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const bankId = req.params.id;
    const bank = await questionBankService.getQuestionBankById(bankId);
    res.status(200).json({ success: true, data: bank });
  } catch (error) {
    if (error.message === "Question bank not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new question bank
 */
const createQuestionBank = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only teachers)
    // TODO: Add input validation
    // Assign bank_guru_id based on logged-in user if applicable
    // const teacherId = req.auth.teacherId; // Assuming teacherId is in JWT payload
    // req.body.bank_guru_id = teacherId;
    
    const newBank = await questionBankService.createQuestionBank(req.body);
    res.status(201).json({ success: true, data: newBank });
  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing question bank
 */
const updateQuestionBank = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner teacher or admin)
    // TODO: Add input validation
    const bankId = req.params.id;
    const updatedBank = await questionBankService.updateQuestionBank(bankId, req.body);
    res.status(200).json({ success: true, data: updatedBank });
  } catch (error) {
    if (error.message === "Question bank not found" || error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a question bank
 */
const deleteQuestionBank = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner teacher or admin)
    const bankId = req.params.id;
    const result = await questionBankService.deleteQuestionBank(bankId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Question bank not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllQuestionBanks,
  getQuestionBankById,
  createQuestionBank,
  updateQuestionBank,
  deleteQuestionBank
};
