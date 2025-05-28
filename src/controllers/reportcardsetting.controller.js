const db = require('../models');
const ReportCardSetting = db.ReportCardSetting;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;
const { Op } = require('sequelize');

// Create a new report card setting
exports.create = async (req, res) => {
  try {
    const reportCardSetting = await ReportCardSetting.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'Report card setting created successfully',
      data: reportCardSetting
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create report card setting',
      error: error.message
    });
  }
};

// Get all report card settings
exports.findAll = async (req, res) => {
  try {
    const { academic_year_id, semester_id } = req.query;
    
    // Build filter condition
    const condition = {};
    if (academic_year_id) condition.academic_year_id = academic_year_id;
    if (semester_id) condition.semester_id = semester_id;
    
    const settings = await ReportCardSetting.findAll({
      where: condition,
      include: [
        { model: AcademicYear },
        { model: Semester }
      ],
      order: [
        ['academic_year_id', 'DESC'],
        ['semester_id', 'ASC']
      ]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Report card settings retrieved successfully',
      data: settings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve report card settings',
      error: error.message
    });
  }
};

// Get report card setting by academic year and semester
exports.findBySemester = async (req, res) => {
  try {
    const { academic_year_id, semester_id } = req.params;
    
    if (!academic_year_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Academic year ID and semester ID are required'
      });
    }
    
    const setting = await ReportCardSetting.findOne({
      where: {
        academic_year_id,
        semester_id
      },
      include: [
        { model: AcademicYear },
        { model: Semester }
      ]
    });
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Report card setting not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Report card setting retrieved successfully',
      data: setting
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve report card setting',
      error: error.message
    });
  }
};

// Get a single report card setting by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const setting = await ReportCardSetting.findByPk(id, {
      include: [
        { model: AcademicYear },
        { model: Semester }
      ]
    });
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: `Report card setting with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Report card setting retrieved successfully',
      data: setting
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve report card setting',
      error: error.message
    });
  }
};

// Update a report card setting
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await ReportCardSetting.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Report card setting with id ${id} not found`
      });
    }
    
    const updatedSetting = await ReportCardSetting.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Report card setting updated successfully',
      data: updatedSetting
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update report card setting',
      error: error.message
    });
  }
};

// Delete a report card setting
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ReportCardSetting.destroy({
      where: { id: id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Report card setting with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Report card setting deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete report card setting',
      error: error.message
    });
  }
};
