const reportService = require("../services/report.service");

/**
 * Get all final grades for a specific class, subject, academic year, and semester
 */
const getFinalGrades = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher/admin)
    const { classId, subjectId, academicYearId, semesterId } = req.query;
    
    if (!classId || !subjectId || !academicYearId || !semesterId) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required parameters: classId, subjectId, academicYearId, semesterId" 
      });
    }
    
    const grades = await reportService.getFinalGrades(
      classId, subjectId, academicYearId, semesterId
    );
    res.status(200).json({ success: true, data: grades });
  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("Missing required")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get final grades for a specific student
 */
const getStudentFinalGrades = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., student/teacher/admin)
    const { studentId } = req.params;
    const { academicYearId, semesterId } = req.query;
    
    if (!academicYearId || !semesterId) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required parameters: academicYearId, semesterId" 
      });
    }
    
    const grades = await reportService.getStudentFinalGrades(
      studentId, academicYearId, semesterId
    );
    res.status(200).json({ success: true, data: grades });
  } catch (error) {
    if (error.message.includes("not found") || error.message.includes("Missing required")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Save or update a final grade
 */
const saveGrade = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher/admin)
    // TODO: Add input validation
    const gradeData = req.body;
    
    const result = await reportService.saveGrade(gradeData);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.message.includes("Missing required")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Bulk save or update final grades
 */
const bulkSaveGrades = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher/admin)
    // TODO: Add input validation
    const gradesData = req.body;
    
    if (!Array.isArray(gradesData)) {
      return res.status(400).json({ 
        success: false, 
        message: "Request body must be an array of grade data" 
      });
    }
    
    const results = await reportService.bulkSaveGrades(gradesData);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    if (error.message.includes("Missing required") || error.message.includes("Invalid grades")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFinalGrades,
  getStudentFinalGrades,
  saveGrade,
  bulkSaveGrades
};
