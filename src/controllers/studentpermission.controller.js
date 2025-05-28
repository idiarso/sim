const db = require('../models');
const StudentPermission = db.StudentPermission;
const StudentProfile = db.StudentProfile;
const TeacherProfile = db.TeacherProfile;
const { Op } = require('sequelize');

// Create a new student permission
exports.create = async (req, res) => {
  try {
    const studentPermission = await StudentPermission.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Student permission created successfully',
      data: studentPermission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create student permission',
      error: error.message
    });
  }
};

// Get all student permissions with pagination and filtering
exports.findAll = async (req, res) => {
  try {
    const { 
      student_id, permission_type, date, start_date, end_date,
      is_approved, approved_by_duty_teacher, parent_confirmation,
      page = 1, limit = 10 
    } = req.query;
    
    // Build filter condition
    const condition = {};
    if (student_id) condition.student_id = student_id;
    if (permission_type) condition.permission_type = permission_type;
    if (is_approved !== undefined) condition.is_approved = is_approved === 'true';
    if (approved_by_duty_teacher) condition.approved_by_duty_teacher = approved_by_duty_teacher;
    if (parent_confirmation !== undefined) condition.parent_confirmation = parent_confirmation === 'true';
    
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
    
    const { count, rows } = await StudentPermission.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: StudentProfile },
        { model: TeacherProfile, as: 'DutyTeacher' }
      ],
      order: [['date', 'DESC'], ['start_time', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Student permissions retrieved successfully',
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
      message: 'Failed to retrieve student permissions',
      error: error.message
    });
  }
};

// Get a single student permission by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const permission = await StudentPermission.findByPk(id, {
      include: [
        { model: StudentProfile },
        { model: TeacherProfile, as: 'DutyTeacher' }
      ]
    });
    
    if (!permission) {
      return res.status(404).json({
        success: false,
        message: `Student permission with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Student permission retrieved successfully',
      data: permission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve student permission',
      error: error.message
    });
  }
};

// Update a student permission
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await StudentPermission.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Student permission with id ${id} not found`
      });
    }
    
    const updatedPermission = await StudentPermission.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Student permission updated successfully',
      data: updatedPermission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update student permission',
      error: error.message
    });
  }
};

// Delete a student permission
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await StudentPermission.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Student permission with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Student permission deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete student permission',
      error: error.message
    });
  }
};

// Approve a student permission
exports.approve = async (req, res) => {
  try {
    const id = req.params.id;
    const { approved_by_duty_teacher, notes } = req.body;
    
    if (!approved_by_duty_teacher) {
      return res.status(400).json({
        success: false,
        message: 'Duty teacher ID is required'
      });
    }
    
    const [updated] = await StudentPermission.update({
      is_approved: true,
      approved_by_duty_teacher,
      notes: notes || null
    }, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Student permission with id ${id} not found`
      });
    }
    
    const updatedPermission = await StudentPermission.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Student permission approved successfully',
      data: updatedPermission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to approve student permission',
      error: error.message
    });
  }
};

// Update parent confirmation
exports.updateParentConfirmation = async (req, res) => {
  try {
    const id = req.params.id;
    const { parent_confirmation, parent_confirmation_method, notes } = req.body;
    
    if (parent_confirmation === undefined || !parent_confirmation_method) {
      return res.status(400).json({
        success: false,
        message: 'Parent confirmation status and method are required'
      });
    }
    
    const [updated] = await StudentPermission.update({
      parent_confirmation: parent_confirmation,
      parent_confirmation_method,
      notes: notes || null
    }, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Student permission with id ${id} not found`
      });
    }
    
    const updatedPermission = await StudentPermission.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Parent confirmation updated successfully',
      data: updatedPermission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update parent confirmation',
      error: error.message
    });
  }
};

// Get permissions for today that need approval
exports.getTodayPendingPermissions = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const pendingPermissions = await StudentPermission.findAll({
      where: {
        date: today,
        is_approved: false
      },
      include: [
        { model: StudentProfile }
      ],
      order: [['start_time', 'ASC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Today\'s pending permissions retrieved successfully',
      data: pendingPermissions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve today\'s pending permissions',
      error: error.message
    });
  }
};
