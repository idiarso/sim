const db = require('../models');
const ExamType = db.ExamType;
const { Op } = require('sequelize');

// Create a new exam type
exports.create = async (req, res) => {
  try {
    const examType = await ExamType.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Exam type created successfully',
      data: examType
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create exam type',
      error: error.message
    });
  }
};

// Get all exam types with filtering and pagination
exports.findAll = async (req, res) => {
  try {
    const { search, is_active, page = 1, limit = 10 } = req.query;
    
    // Build filter condition
    const condition = {};
    if (is_active !== undefined) condition.is_active = is_active === 'true';
    
    // Search in name, code, and description
    if (search) {
      condition[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await ExamType.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      order: [['name', 'ASC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Exam types retrieved successfully',
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
      message: 'Failed to retrieve exam types',
      error: error.message
    });
  }
};

// Get a single exam type by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const examType = await ExamType.findByPk(id);
    
    if (!examType) {
      return res.status(404).json({
        success: false,
        message: `Exam type with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Exam type retrieved successfully',
      data: examType
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve exam type',
      error: error.message
    });
  }
};

// Update an exam type
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await ExamType.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Exam type with id ${id} not found`
      });
    }
    
    const updatedExamType = await ExamType.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Exam type updated successfully',
      data: updatedExamType
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update exam type',
      error: error.message
    });
  }
};

// Delete an exam type
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ExamType.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Exam type with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Exam type deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete exam type',
      error: error.message
    });
  }
};

// Toggle active status of an exam type
exports.toggleActive = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Get current status
    const examType = await ExamType.findByPk(id);
    if (!examType) {
      return res.status(404).json({
        success: false,
        message: `Exam type with id ${id} not found`
      });
    }
    
    // Toggle status
    const [updated] = await ExamType.update(
      { is_active: !examType.is_active },
      { where: { id: id } }
    );
    
    return res.status(200).json({
      success: true,
      message: `Exam type ${examType.is_active ? 'deactivated' : 'activated'} successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to toggle exam type status',
      error: error.message
    });
  }
};
