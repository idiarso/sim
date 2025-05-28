const express = require("express");
const teacherController = require("../controllers/teacher.controller");

const router = express.Router();

// GET /api/v1/master/teachers - Get all teachers
router.get("/teachers", teacherController.getAllTeachers);

// GET /api/v1/master/teachers/:id - Get a single teacher by ID
router.get("/teachers/:id", teacherController.getTeacherById);

// POST /api/v1/master/teachers - Create a new teacher
router.post("/teachers", teacherController.createTeacher);

// PUT /api/v1/master/teachers/:id - Update an existing teacher
router.put("/teachers/:id", teacherController.updateTeacher);

// DELETE /api/v1/master/teachers/:id - Delete a teacher
router.delete("/teachers/:id", teacherController.deleteTeacher);

// Other master data routes will be added here (students, classes, subjects, etc.)

module.exports = router;


const studentController = require("../controllers/student.controller");

// GET /api/v1/master/students - Get all students
router.get("/students", studentController.getAllStudents);

// GET /api/v1/master/students/:id - Get a single student by ID
router.get("/students/:id", studentController.getStudentById);

// POST /api/v1/master/students - Create a new student
router.post("/students", studentController.createStudent);

// PUT /api/v1/master/students/:id - Update an existing student
router.put("/students/:id", studentController.updateStudent);

// DELETE /api/v1/master/students/:id - Delete a student
router.delete("/students/:id", studentController.deleteStudent);

// Add routes for classes, subjects, etc. here



const classController = require("../controllers/class.controller");

// GET /api/v1/master/classes - Get all classes
router.get("/classes", classController.getAllClasses);

// GET /api/v1/master/classes/:id - Get a single class by ID
router.get("/classes/:id", classController.getClassById);

// POST /api/v1/master/classes - Create a new class
router.post("/classes", classController.createClass);

// PUT /api/v1/master/classes/:id - Update an existing class
router.put("/classes/:id", classController.updateClass);

// DELETE /api/v1/master/classes/:id - Delete a class
router.delete("/classes/:id", classController.deleteClass);

// Add routes for subjects, etc. here



const subjectController = require("../controllers/subject.controller");

// GET /api/v1/master/subjects - Get all subjects
router.get("/subjects", subjectController.getAllSubjects);

// GET /api/v1/master/subjects/:id - Get a single subject by ID
router.get("/subjects/:id", subjectController.getSubjectById);

// POST /api/v1/master/subjects - Create a new subject
router.post("/subjects", subjectController.createSubject);

// PUT /api/v1/master/subjects/:id - Update an existing subject
router.put("/subjects/:id", subjectController.updateSubject);

// DELETE /api/v1/master/subjects/:id - Delete a subject
router.delete("/subjects/:id", subjectController.deleteSubject);

// Add routes for other master data (e.g., academic years, semesters, majors) here

