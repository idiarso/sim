const db = require('../models');
const TeacherDuty = db.TeacherDuty;
const TeacherProfile = db.TeacherProfile;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;
const { Op } = require('sequelize');

// Create a new teacher duty schedule
exports.create = async (req, res) => {
  try {
    const teacherDuty = await TeacherDuty.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Teacher duty schedule created successfully',
      data: teacherDuty
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create teacher duty schedule',
      error: error.message
    });
  }
};

// Get all teacher duty schedules with pagination and filtering
exports.findAll = async (req, res) => {
  try {
    const { 
      teacher_id, day_of_week, academic_year_id, 
      semester_id, page = 1, limit = 10 
    } = req.query;
    
    // Build filter condition
    const condition = {};
    if (teacher_id) condition.teacher_id = teacher_id;
    if (day_of_week) condition.day_of_week = day_of_week;
    if (academic_year_id) condition.academic_year_id = academic_year_id;
    if (semester_id) condition.semester_id = semester_id;
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await TeacherDuty.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: TeacherProfile },
        { model: AcademicYear },
        { model: Semester }
      ],
      order: [
        ['day_of_week', 'ASC'],
        ['teacher_id', 'ASC']
      ]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Teacher duty schedules retrieved successfully',
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
      message: 'Failed to retrieve teacher duty schedules',
      error: error.message
    });
  }
};

// Get duty teachers for a specific day
exports.getDutyTeachersForDay = async (req, res) => {
  try {
    const { day_of_week, academic_year_id, semester_id } = req.query;
    
    if (!day_of_week || !academic_year_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Day of week, academic year ID, and semester ID are required'
      });
    }
    
    const dutyTeachers = await TeacherDuty.findAll({
      where: {
        day_of_week,
        academic_year_id,
        semester_id
      },
      include: [
        { model: TeacherProfile }
      ],
      order: [['teacher_id', 'ASC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Duty teachers retrieved successfully',
      data: dutyTeachers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve duty teachers',
      error: error.message
    });
  }
};

// Get a single teacher duty schedule by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherDuty = await TeacherDuty.findByPk(id, {
      include: [
        { model: TeacherProfile },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
    
    if (!teacherDuty) {
      return res.status(404).json({
        success: false,
        message: `Teacher duty schedule with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Teacher duty schedule retrieved successfully',
      data: teacherDuty
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve teacher duty schedule',
      error: error.message
    });
  }
};

// Update a teacher duty schedule
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await TeacherDuty.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Teacher duty schedule with id ${id} not found`
      });
    }
    
    const updatedTeacherDuty = await TeacherDuty.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Teacher duty schedule updated successfully',
      data: updatedTeacherDuty
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update teacher duty schedule',
      error: error.message
    });
  }
};

// Delete a teacher duty schedule
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await TeacherDuty.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Teacher duty schedule with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Teacher duty schedule deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete teacher duty schedule',
      error: error.message
    });
  }
};

// Create duty schedules for a week (bulk)
exports.createWeekSchedule = async (req, res) => {
  try {
    const { academic_year_id, semester_id, schedules } = req.body;
    
    if (!academic_year_id || !semester_id || !schedules || !Array.isArray(schedules)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data. Required: academic_year_id, semester_id, and schedules array'
      });
    }
    
    // Add academic_year_id and semester_id to each schedule
    const dutySchedules = schedules.map(schedule => ({
      ...schedule,
      academic_year_id,
      semester_id
    }));
    
    const created = await TeacherDuty.bulkCreate(dutySchedules);
    
    return res.status(201).json({
      success: true,
      message: 'Weekly duty schedules created successfully',
      data: created
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create weekly duty schedules',
      error: error.message
    });
  }
};
