const express = require("express");
const questionBankController = require("../controllers/questionbank.controller");

const router = express.Router();

// --- Question Bank Routes ---

// GET /api/v1/cbt/banks - Get all question banks
router.get("/banks", questionBankController.getAllQuestionBanks);

// GET /api/v1/cbt/banks/:id - Get a single question bank by ID
router.get("/banks/:id", questionBankController.getQuestionBankById);

// POST /api/v1/cbt/banks - Create a new question bank
router.post("/banks", questionBankController.createQuestionBank);

// PUT /api/v1/cbt/banks/:id - Update an existing question bank
router.put("/banks/:id", questionBankController.updateQuestionBank);

// DELETE /api/v1/cbt/banks/:id - Delete a question bank
router.delete("/banks/:id", questionBankController.deleteQuestionBank);

// --- Question Routes (To be added) ---

// --- Exam Schedule Routes (To be added) ---

// --- Exam Taking Routes (To be added) ---

// --- Exam Result Routes (To be added) ---

module.exports = router;

const questionController = require("../controllers/question.controller");

// --- Question Routes ---

// GET /api/v1/cbt/banks/:bankId/questions - Get all questions for a specific bank
router.get("/banks/:bankId/questions", questionController.getQuestionsByBank);

// GET /api/v1/cbt/questions/:id - Get a single question by ID
router.get("/questions/:id", questionController.getQuestionById);

// POST /api/v1/cbt/banks/:bankId/questions - Create a new question for a specific bank
router.post("/banks/:bankId/questions", questionController.createQuestion);

// PUT /api/v1/cbt/questions/:id - Update an existing question
router.put("/questions/:id", questionController.updateQuestion);

// DELETE /api/v1/cbt/questions/:id - Delete a question
router.delete("/questions/:id", questionController.deleteQuestion);


const examScheduleController = require("../controllers/examschedule.controller");

// --- Exam Schedule Routes ---

// GET /api/v1/cbt/schedules - Get all exam schedules
router.get("/schedules", examScheduleController.getAllExamSchedules);

// GET /api/v1/cbt/schedules/:id - Get a single exam schedule by ID
router.get("/schedules/:id", examScheduleController.getExamScheduleById);

// POST /api/v1/cbt/schedules - Create a new exam schedule
router.post("/schedules", examScheduleController.createExamSchedule);

// PUT /api/v1/cbt/schedules/:id - Update an existing exam schedule
router.put("/schedules/:id", examScheduleController.updateExamSchedule);

// DELETE /api/v1/cbt/schedules/:id - Delete an exam schedule
router.delete("/schedules/:id", examScheduleController.deleteExamSchedule);


const examTakingController = require("../controllers/examtaking.controller");

// --- Exam Taking Routes ---

// POST /api/v1/cbt/schedules/:scheduleId/start - Start an exam for the student
router.post("/schedules/:scheduleId/start", examTakingController.startExam);

// GET /api/v1/cbt/schedules/:scheduleId/questions - Get questions for the current exam session
router.get("/schedules/:scheduleId/questions", examTakingController.getExamQuestions);

// POST /api/v1/cbt/schedules/:scheduleId/questions/:questionId/answer - Save student's answer
router.post("/schedules/:scheduleId/questions/:questionId/answer", examTakingController.saveAnswer);

// POST /api/v1/cbt/schedules/:scheduleId/finish - Finish the exam
router.post("/schedules/:scheduleId/finish", examTakingController.finishExam);

// --- Exam Result Routes (To be added) ---



const examResultController = require("../controllers/examresult.controller");

// --- Exam Result Routes ---

// GET /api/v1/cbt/results/schedule/:scheduleId - Get all results for a schedule
router.get("/results/schedule/:scheduleId", examResultController.getResultsBySchedule);

// GET /api/v1/cbt/results/student/:studentId/schedule/:scheduleId - Get a specific student's result
router.get("/results/student/:studentId/schedule/:scheduleId", examResultController.getStudentResult);

// GET /api/v1/cbt/results/grading/schedule/:scheduleId - Get essay answers needing grading
router.get("/results/grading/schedule/:scheduleId", examResultController.getAnswersForGrading);

// POST /api/v1/cbt/results/grading/answer/:studentQuestionId - Save manual grade for an essay
router.post("/results/grading/answer/:studentQuestionId", examResultController.saveManualGrade);

