const db = require('../models');
const ClassAttendance = db.ClassAttendance;
const StudentProfile = db.StudentProfile;
const Class = db.Class;
const { Op } = require('sequelize');

// Create new attendance records (bulk)
exports.createBulk = async (req, res) => {
  try {
    const { attendance_records, class_id, date } = req.body;
    
    if (!attendance_records || !Array.isArray(attendance_records) || !class_id || !date) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data. Required: attendance_records array, class_id, and date'
      });
    }

    // Add created_by (current user) to each record
    const records = attendance_records.map(record => ({
      ...record,
      class_id,
      date,
      created_by: req.auth.id
    }));
    
    const created = await ClassAttendance.bulkCreate(records);
    
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

// Get attendance records with pagination and filtering
exports.findAll = async (req, res) => {
  try {
    const { 
      class_id, student_id, date, start_date, end_date, 
      status, page = 1, limit = 10 
    } = req.query;
    
    // Build filter condition
    const condition = {};
    if (class_id) condition.class_id = class_id;
    if (student_id) condition.student_id = student_id;
    if (status) condition.status = status;
    
    // Date filter
    if (date) {
      condition.date = date;
    } else if (start_date && end_date) {
      condition.date = {
        [Op.between]: [start_date, end_date]
      };
    } else if (start_date) {
      condition.date = {
        [Op.gte]: start_date
      };
    } else if (end_date) {
      condition.date = {
        [Op.lte]: end_date
      };
    }
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await ClassAttendance.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: StudentProfile },
        { model: Class }
      ],
      order: [['date', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Attendance records retrieved successfully',
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
      message: 'Failed to retrieve attendance records',
      error: error.message
    });
  }
};

// Get attendance for a specific class on a specific date
exports.getClassAttendance = async (req, res) => {
  try {
    const { class_id, date } = req.params;
    
    if (!class_id || !date) {
      return res.status(400).json({
        success: false,
        message: 'Class ID and date are required'
      });
    }
    
    // Get all students in the class
    const classData = await Class.findByPk(class_id, {
      include: [{
        model: db.StudentProfile,
        through: { attributes: [] }
      }]
    });
    
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: `Class with id ${class_id} not found`
      });
    }
    
    // Get existing attendance records for the class and date
    const existingAttendance = await ClassAttendance.findAll({
      where: {
        class_id,
        date
      },
      include: [{ model: StudentProfile }]
    });
    
    // Map existing attendance data
    const attendanceMap = new Map();
    existingAttendance.forEach(record => {
      attendanceMap.set(record.student_id, record);
    });
    
    // Combine student data with attendance
    const attendanceData = classData.StudentProfiles.map(student => {
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
      message: 'Class attendance data retrieved successfully',
      data: {
        class_name: classData.name,
        date: date,
        attendance: attendanceData
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve class attendance',
      error: error.message
    });
  }
};

// Update attendance record
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await ClassAttendance.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Attendance record with id ${id} not found`
      });
    }
    
    const updatedRecord = await ClassAttendance.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Attendance record updated successfully',
      data: updatedRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update attendance record',
      error: error.message
    });
  }
};

// Get attendance summary for a student
exports.getStudentAttendanceSummary = async (req, res) => {
  try {
    const { student_id, academic_year_id, semester_id } = req.query;
    
    if (!student_id) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }
    
    // Get class for the student in the current academic year/semester
    const studentClass = await db.ClassStudent.findOne({
      where: {
        student_id,
        ...(academic_year_id && { academic_year_id }),
        ...(semester_id && { semester_id })
      },
      include: [{ model: Class }]
    });
    
    if (!studentClass) {
      return res.status(404).json({
        success: false,
        message: 'Student not assigned to any class for the specified period'
      });
    }
    
    // Build date filter condition
    let dateCondition = {};
    if (academic_year_id && semester_id) {
      // Get semester start and end dates
      const semester = await db.Semester.findOne({
        where: { id: semester_id }
      });
      
      if (semester) {
        dateCondition = {
          [Op.between]: [semester.start_date, semester.end_date]
        };
      }
    }
    
    // Count attendance by status
    const summary = await ClassAttendance.findAll({
      attributes: [
        'status',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      where: {
        student_id,
        class_id: studentClass.class_id,
        ...(Object.keys(dateCondition).length > 0 && { date: dateCondition })
      },
      group: ['status']
    });
    
    // Format the summary
    const formattedSummary = {
      present: 0,
      absent: 0,
      sick: 0,
      permission: 0,
      total: 0
    };
    
    summary.forEach(item => {
      formattedSummary[item.status] = parseInt(item.dataValues.count);
      formattedSummary.total += parseInt(item.dataValues.count);
    });
    
    return res.status(200).json({
      success: true,
      message: 'Student attendance summary retrieved successfully',
      data: {
        student_id,
        class_id: studentClass.class_id,
        class_name: studentClass.Class.name,
        summary: formattedSummary
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve student attendance summary',
      error: error.message
    });
  }
};
