const express = require("express");
const reportController = require("../controllers/report.controller");

const router = express.Router();

// GET /api/v1/reports/final-grades - Get final grades by class, subject, year, semester
router.get("/final-grades", reportController.getFinalGrades);

// GET /api/v1/reports/student/:studentId/final-grades - Get final grades for a student
router.get("/student/:studentId/final-grades", reportController.getStudentFinalGrades);

// POST /api/v1/reports/final-grades - Save/update a single final grade
router.post("/final-grades", reportController.saveGrade);

// POST /api/v1/reports/final-grades/bulk - Bulk save/update final grades
router.post("/final-grades/bulk", reportController.bulkSaveGrades);

module.exports = router;
