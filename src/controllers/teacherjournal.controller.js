const db = require('../models');
const TeacherJournal = db.TeacherJournal;
const TeacherProfile = db.TeacherProfile;
const Class = db.Class;
const Subject = db.Subject;
const { Op } = require('sequelize');

// Create a new journal entry
exports.create = async (req, res) => {
  try {
    const journal = await TeacherJournal.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Journal entry created successfully',
      data: journal
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create journal entry',
      error: error.message
    });
  }
};

// Get all journal entries with pagination and filtering
exports.findAll = async (req, res) => {
  try {
    const { 
      teacher_id, class_id, subject_id, 
      academic_year_id, semester_id, 
      start_date, end_date, 
      page = 1, limit = 10 
    } = req.query;
    
    // Build filter condition
    const condition = {};
    if (teacher_id) condition.teacher_id = teacher_id;
    if (class_id) condition.class_id = class_id;
    if (subject_id) condition.subject_id = subject_id;
    if (academic_year_id) condition.academic_year_id = academic_year_id;
    if (semester_id) condition.semester_id = semester_id;
    
    // Date range filter
    if (start_date && end_date) {
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
    
    const { count, rows } = await TeacherJournal.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: TeacherProfile },
        { model: Class },
        { model: Subject }
      ],
      order: [['date', 'DESC'], ['start_time', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Journal entries retrieved successfully',
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
      message: 'Failed to retrieve journal entries',
      error: error.message
    });
  }
};

// Get a single journal entry by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const journal = await TeacherJournal.findByPk(id, {
      include: [
        { model: TeacherProfile },
        { model: Class },
        { model: Subject }
      ]
    });
    
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: `Journal entry with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Journal entry retrieved successfully',
      data: journal
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve journal entry',
      error: error.message
    });
  }
};

// Update a journal entry
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await TeacherJournal.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Journal entry with id ${id} not found`
      });
    }
    
    const updatedJournal = await TeacherJournal.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Journal entry updated successfully',
      data: updatedJournal
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update journal entry',
      error: error.message
    });
  }
};

// Delete a journal entry
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await TeacherJournal.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Journal entry with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Journal entry deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete journal entry',
      error: error.message
    });
  }
};

// Get teacher journal summary for reporting
exports.getJournalSummary = async (req, res) => {
  try {
    const { teacher_id, academic_year_id, semester_id } = req.query;
    
    if (!teacher_id || !academic_year_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Teacher ID, academic year ID, and semester ID are required'
      });
    }
    
    // Get journal entries count by subject
    const journalBySubject = await TeacherJournal.findAll({
      attributes: [
        'subject_id',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'total_entries']
      ],
      where: {
        teacher_id,
        academic_year_id,
        semester_id
      },
      include: [{ model: Subject, attributes: ['name'] }],
      group: ['subject_id', 'Subject.id', 'Subject.name']
    });
    
    // Get journal entries count by class
    const journalByClass = await TeacherJournal.findAll({
      attributes: [
        'class_id',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'total_entries']
      ],
      where: {
        teacher_id,
        academic_year_id,
        semester_id
      },
      include: [{ model: Class, attributes: ['name'] }],
      group: ['class_id', 'Class.id', 'Class.name']
    });
    
    return res.status(200).json({
      success: true,
      message: 'Journal summary retrieved successfully',
      data: {
        by_subject: journalBySubject,
        by_class: journalByClass
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve journal summary',
      error: error.message
    });
  }
};
