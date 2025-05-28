const db = require('../models');
const LearningMaterial = db.LearningMaterial;
const TeacherProfile = db.TeacherProfile;
const Subject = db.Subject;
const Class = db.Class;
const { Op } = require('sequelize');

// Create a new learning material
exports.create = async (req, res) => {
  try {
    const material = await LearningMaterial.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Learning material created successfully',
      data: material
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create learning material',
      error: error.message
    });
  }
};

// Get all learning materials with filtering and pagination
exports.findAll = async (req, res) => {
  try {
    const { 
      teacher_id, subject_id, class_id, 
      academic_year_id, semester_id, is_published,
      search, page = 1, limit = 10 
    } = req.query;
    
    // Build filter condition
    const condition = {};
    if (teacher_id) condition.teacher_id = teacher_id;
    if (subject_id) condition.subject_id = subject_id;
    if (class_id) condition.class_id = class_id;
    if (academic_year_id) condition.academic_year_id = academic_year_id;
    if (semester_id) condition.semester_id = semester_id;
    if (is_published !== undefined) condition.is_published = is_published === 'true';
    
    // Search in title and description
    if (search) {
      condition[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await LearningMaterial.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: Class }
      ],
      order: [['publish_date', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Learning materials retrieved successfully',
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
      message: 'Failed to retrieve learning materials',
      error: error.message
    });
  }
};

// Get a single learning material by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const material = await LearningMaterial.findByPk(id, {
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: Class }
      ]
    });
    
    if (!material) {
      return res.status(404).json({
        success: false,
        message: `Learning material with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Learning material retrieved successfully',
      data: material
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve learning material',
      error: error.message
    });
  }
};

// Update a learning material
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await LearningMaterial.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Learning material with id ${id} not found`
      });
    }
    
    const updatedMaterial = await LearningMaterial.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Learning material updated successfully',
      data: updatedMaterial
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update learning material',
      error: error.message
    });
  }
};

// Delete a learning material
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await LearningMaterial.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Learning material with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Learning material deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete learning material',
      error: error.message
    });
  }
};

// Publish a learning material
exports.publish = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await LearningMaterial.update(
      { is_published: true },
      { where: { id: id } }
    );
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Learning material with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Learning material published successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to publish learning material',
      error: error.message
    });
  }
};

// Unpublish a learning material
exports.unpublish = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await LearningMaterial.update(
      { is_published: false },
      { where: { id: id } }
    );
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Learning material with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Learning material unpublished successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to unpublish learning material',
      error: error.message
    });
  }
};
