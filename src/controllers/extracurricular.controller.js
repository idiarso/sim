const db = require('../models');
const Extracurricular = db.Extracurricular;
const ExtracurricularStudent = db.ExtracurricularStudent;
const ExtracurricularAttendance = db.ExtracurricularAttendance;
const TeacherProfile = db.TeacherProfile;
const StudentProfile = db.StudentProfile;
const { Op } = require('sequelize');

// Create a new extracurricular activity
exports.create = async (req, res) => {
  try {
    const extracurricular = await Extracurricular.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Extracurricular activity created successfully',
      data: extracurricular
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create extracurricular activity',
      error: error.message
    });
  }
};

// Get all extracurricular activities
exports.findAll = async (req, res) => {
  try {
    const { coach_id, is_active, page = 1, limit = 10 } = req.query;
    
    // Build filter condition
    const condition = {};
    if (coach_id) condition.coach_id = coach_id;
    if (is_active !== undefined) condition.is_active = is_active === 'true';
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Extracurricular.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: TeacherProfile, as: 'Coach' }
      ],
      order: [['name', 'ASC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Extracurricular activities retrieved successfully',
      data: rows,
      meta: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve extracurricular activities',
      error: error.message
    });
  }
};

// Get a single extracurricular activity by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const extracurricular = await Extracurricular.findByPk(id, {
      include: [
        { model: TeacherProfile, as: 'Coach' }
      ]
    });
    
    if (!extracurricular) {
      return res.status(404).json({
        success: false,
        message: `Extracurricular activity with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Extracurricular activity retrieved successfully',
      data: extracurricular
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve extracurricular activity',
      error: error.message
    });
  }
};

// Update an extracurricular activity
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Extracurricular.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Extracurricular activity with id ${id} not found`
      });
    }
    
    const updatedExtracurricular = await Extracurricular.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Extracurricular activity updated successfully',
      data: updatedExtracurricular
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update extracurricular activity',
      error: error.message
    });
  }
};

// Delete an extracurricular activity
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Extracurricular.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Extracurricular activity with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Extracurricular activity deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete extracurricular activity',
      error: error.message
    });
  }
};

// Enroll students in an extracurricular activity
exports.enrollStudents = async (req, res) => {
  try {
    const { extracurricular_id, student_ids, academic_year_id, semester_id } = req.body;
    
    if (!extracurricular_id || !student_ids || !Array.isArray(student_ids) || 
        !academic_year_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data. Required: extracurricular_id, student_ids array, academic_year_id, and semester_id'
      });
    }
    
    // Check if extracurricular exists
    const extracurricular = await Extracurricular.findByPk(extracurricular_id);
    if (!extracurricular) {
      return res.status(404).json({
        success: false,
        message: `Extracurricular activity with id ${extracurricular_id} not found`
      });
    }
    
    // Check if any students are already enrolled
    const existingEnrollments = await ExtracurricularStudent.findAll({
      where: {
        extracurricular_id,
        student_id: { [Op.in]: student_ids },
        academic_year_id,
        semester_id,
        status: 'active'
      }
    });
    
    const existingStudentIds = existingEnrollments.map(enrollment => enrollment.student_id);
    const newStudentIds = student_ids.filter(id => !existingStudentIds.includes(parseInt(id)));
    
    // Create enrollment records for new students
    const enrollmentRecords = newStudentIds.map(student_id => ({
      extracurricular_id,
      student_id,
      academic_year_id,
      semester_id,
      join_date: new Date(),
      status: 'active'
    }));
    
    let enrolledStudents = [];
    if (enrollmentRecords.length > 0) {
      enrolledStudents = await ExtracurricularStudent.bulkCreate(enrollmentRecords);
    }
    
    return res.status(201).json({
      success: true,
      message: 'Students enrolled successfully',
      data: {
        enrolled: enrolledStudents.length,
        already_enrolled: existingStudentIds.length,
        total: student_ids.length
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to enroll students',
      error: error.message
    });
  }
};

// Record attendance for extracurricular activity
exports.recordAttendance = async (req, res) => {
  try {
    const { extracurricular_id, date, attendance_records } = req.body;
    
    if (!extracurricular_id || !date || !attendance_records || !Array.isArray(attendance_records)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data. Required: extracurricular_id, date, and attendance_records array'
      });
    }
    
    // Add created_by (current user) to each record
    const records = attendance_records.map(record => ({
      ...record,
      extracurricular_id,
      date,
      created_by: req.auth.id
    }));
    
    const created = await ExtracurricularAttendance.bulkCreate(records);
    
    return res.status(201).json({
      success: true,
      message: 'Attendance records created successfully',
      data: created
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create attendance records',
      error: error.message
    });
  }
};

// Get extracurricular attendance for a specific date
exports.getAttendance = async (req, res) => {
  try {
    const { extracurricular_id, date } = req.params;
    
    if (!extracurricular_id || !date) {
      return res.status(400).json({
        success: false,
        message: 'Extracurricular ID and date are required'
      });
    }
    
    // Get extracurricular information
    const extracurricular = await Extracurricular.findByPk(extracurricular_id, {
      include: [{ model: TeacherProfile, as: 'Coach' }]
    });
    
    if (!extracurricular) {
      return res.status(404).json({
        success: false,
        message: `Extracurricular activity with id ${extracurricular_id} not found`
      });
    }
    
    // Get all enrolled students
    const enrolled = await ExtracurricularStudent.findAll({
      where: {
        extracurricular_id,
        status: 'active'
      },
      include: [{ model: StudentProfile }]
    });
    
    // Get existing attendance records for the given date
    const existingAttendance = await ExtracurricularAttendance.findAll({
      where: {
        extracurricular_id,
        date
      }
    });
    
    // Map existing attendance data
    const attendanceMap = new Map();
    existingAttendance.forEach(record => {
      attendanceMap.set(record.student_id, record);
    });
    
    // Combine student data with attendance
    const attendanceData = enrolled.map(enrollment => {
      const student = enrollment.StudentProfile;
      const attendanceRecord = attendanceMap.get(student.id);
      
      return {
        student_id: student.id,
        student_name: student.name,
        student_number: student.student_number,
        attendance: attendanceRecord ? {
          id: attendanceRecord.id,
          status: attendanceRecord.status,
          notes: attendanceRecord.notes
        } : {
          status: null,
          notes: null
        }
      };
    });
    
    return res.status(200).json({
      success: true,
      message: 'Extracurricular attendance data retrieved successfully',
      data: {
        extracurricular_name: extracurricular.name,
        coach: extracurricular.Coach.name,
        date: date,
        attendance: attendanceData
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve extracurricular attendance',
      error: error.message
    });
  }
};

// Get students enrolled in an extracurricular activity
exports.getEnrolledStudents = async (req, res) => {
  try {
    const { extracurricular_id, academic_year_id, semester_id, status } = req.query;
    
    if (!extracurricular_id) {
      return res.status(400).json({
        success: false,
        message: 'Extracurricular ID is required'
      });
    }
    
    // Build filter condition
    const condition = { extracurricular_id };
    if (academic_year_id) condition.academic_year_id = academic_year_id;
    if (semester_id) condition.semester_id = semester_id;
    if (status) condition.status = status;
    
    const enrollments = await ExtracurricularStudent.findAll({
      where: condition,
      include: [
        { model: StudentProfile }
      ],
      order: [['join_date', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Enrolled students retrieved successfully',
      data: enrollments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enrolled students',
      error: error.message
    });
  }
};
