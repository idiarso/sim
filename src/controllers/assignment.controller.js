const db = require('../models');
const Assignment = db.Assignment;
const AssignmentSubmission = db.AssignmentSubmission;
const TeacherProfile = db.TeacherProfile;
const Subject = db.Subject;
const Class = db.Class;
const { Op } = require('sequelize');

// Create a new assignment
exports.create = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: assignment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create assignment',
      error: error.message
    });
  }
};

// Get all assignments with filtering and pagination
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
    
    const { count, rows } = await Assignment.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: Class }
      ],
      order: [['due_date', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Assignments retrieved successfully',
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
      message: 'Failed to retrieve assignments',
      error: error.message
    });
  }
};

// Get a single assignment by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const assignment = await Assignment.findByPk(id, {
      include: [
        { model: TeacherProfile },
        { model: Subject },
        { model: Class }
      ]
    });
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: `Assignment with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Assignment retrieved successfully',
      data: assignment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assignment',
      error: error.message
    });
  }
};

// Update an assignment
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Assignment.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Assignment with id ${id} not found`
      });
    }
    
    const updatedAssignment = await Assignment.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Assignment updated successfully',
      data: updatedAssignment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update assignment',
      error: error.message
    });
  }
};

// Delete an assignment
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Assignment.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Assignment with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete assignment',
      error: error.message
    });
  }
};

// Publish an assignment
exports.publish = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Assignment.update(
      { is_published: true },
      { where: { id: id } }
    );
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Assignment with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Assignment published successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to publish assignment',
      error: error.message
    });
  }
};

// Unpublish an assignment
exports.unpublish = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Assignment.update(
      { is_published: false },
      { where: { id: id } }
    );
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Assignment with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Assignment unpublished successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to unpublish assignment',
      error: error.message
    });
  }
};

// Get all submissions for an assignment
exports.getSubmissions = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    
    // Check if assignment exists
    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: `Assignment with id ${assignmentId} not found`
      });
    }
    
    const submissions = await AssignmentSubmission.findAll({
      where: { assignment_id: assignmentId },
      include: [
        { model: db.StudentProfile }
      ],
      order: [['submission_date', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Assignment submissions retrieved successfully',
      data: submissions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assignment submissions',
      error: error.message
    });
  }
};

// Grade a submission
exports.gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { score, feedback } = req.body;
    
    if (score === undefined || feedback === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Score and feedback are required'
      });
    }
    
    const [updated] = await AssignmentSubmission.update({
      score,
      feedback,
      graded_at: new Date(),
      graded_by: req.auth.id // Assuming the teacher ID is stored in the JWT token
    }, {
      where: { id: submissionId }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Submission with id ${submissionId} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Submission graded successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to grade submission',
      error: error.message
    });
  }
};
