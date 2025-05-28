const db = require("../models");
const Question = db.Question;
const QuestionBank = db.QuestionBank;
const Subject = db.Subject;

/**
 * Get all questions for a specific bank
 */
const getQuestionsByBank = async (bankId) => {
  try {
    // Verify bank exists
    const bank = await QuestionBank.findByPk(bankId);
    if (!bank) {
      throw new Error("Question bank not found");
    }
    return await Question.findAll({ where: { bank_id: bankId } });
  } catch (error) {
    console.error(`Error fetching questions for bank ${bankId}:`, error);
    throw error;
  }
};

/**
 * Get a single question by ID
 */
const getQuestionById = async (questionId) => {
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    console.error(`Error fetching question ${questionId}:`, error);
    throw error;
  }
};

/**
 * Create a new question for a specific bank
 */
const createQuestion = async (bankId, questionData) => {
  try {
    // Verify bank exists
    const bank = await QuestionBank.findByPk(bankId);
    if (!bank) {
      throw new Error("Question bank not found");
    }
    
    // Assign bank_id and potentially mapel_id from the bank
    questionData.bank_id = bankId;
    if (!questionData.mapel_id && bank.bank_mapel_id) {
        questionData.mapel_id = bank.bank_mapel_id;
    }
    
    // Set timestamps
    const now = Math.floor(Date.now() / 1000);
    questionData.created_on = now;
    questionData.updated_on = now;
    
    const newQuestion = await Question.create(questionData);
    
    // Update question count in the bank
    await updateBankQuestionCount(bankId);
    
    return newQuestion;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

/**
 * Update an existing question
 */
const updateQuestion = async (questionId, updateData) => {
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    
    // Set updated timestamp
    updateData.updated_on = Math.floor(Date.now() / 1000);
    
    await question.update(updateData);
    
    // If question type/status changes, update bank count
    if (updateData.jenis !== undefined) {
        await updateBankQuestionCount(question.bank_id);
    }
    
    return await Question.findByPk(questionId);
  } catch (error) {
    console.error(`Error updating question ${questionId}:`, error);
    throw error;
  }
};

/**
 * Delete a question
 */
const deleteQuestion = async (questionId) => {
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    
    const bankId = question.bank_id;
    await question.destroy();
    
    // Update question count in the bank
    await updateBankQuestionCount(bankId);
    
    return { message: "Question deleted successfully" };
  } catch (error) {
    console.error(`Error deleting question ${questionId}:`, error);
    throw error;
  }
};

// Helper function to update question counts in the bank
const updateBankQuestionCount = async (bankId) => {
  if (!bankId) return;
  try {
    const bank = await QuestionBank.findByPk(bankId);
    if (!bank) return;

    const counts = await Question.findAll({
      where: { bank_id: bankId },
      attributes: [
        "jenis",
        [db.sequelize.fn("COUNT", db.sequelize.col("id_soal")), "count"],
      ],
      group: ["jenis"],
      raw: true,
    });

    const updateData = {
      jml_soal: 0,
      jml_esai: 0,
      jml_kompleks: 0,
      jml_jodohkan: 0,
      jml_isian: 0,
    };

    let totalQuestions = 0;
    counts.forEach(item => {
      totalQuestions += parseInt(item.count, 10);
      switch (item.jenis) {
        case 1: // PG
          updateData.jml_soal = parseInt(item.count, 10);
          break;
        case 2: // Kompleks
          updateData.jml_kompleks = parseInt(item.count, 10);
          break;
        case 3: // Jodohkan
          updateData.jml_jodohkan = parseInt(item.count, 10);
          break;
        case 4: // Isian
          updateData.jml_isian = parseInt(item.count, 10);
          break;
        case 5: // Esai
          updateData.jml_esai = parseInt(item.count, 10);
          break;
      }
    });
    
    // Recalculate jml_soal to be only PG count based on original schema logic
    // updateData.jml_soal = updateData.jml_soal; // Already set above

    await bank.update(updateData);

  } catch (error) {
    console.error(`Error updating question count for bank ${bankId}:`, error);
  }
};

module.exports = {
  getQuestionsByBank,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
};
