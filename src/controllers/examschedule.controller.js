const examScheduleService = require("../services/examschedule.service");

/**
 * Get all exam schedules
 */
const getAllExamSchedules = async (req, res) => {
  try {
    // TODO: Add authorization check
    // TODO: Add filtering based on req.query
    const schedules = await examScheduleService.getAllExamSchedules(req.query);
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single exam schedule by ID
 */
const getExamScheduleById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const scheduleId = req.params.id;
    const schedule = await examScheduleService.getExamScheduleById(scheduleId);
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    if (error.message === "Exam schedule not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new exam schedule
 */
const createExamSchedule = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only teachers/admins)
    // TODO: Add input validation
    const newSchedule = await examScheduleService.createExamSchedule(req.body);
    res.status(201).json({ success: true, data: newSchedule });
  } catch (error) {
    if (error.message.includes("not found")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing exam schedule
 */
const updateExamSchedule = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner/admin)
    // TODO: Add input validation
    const scheduleId = req.params.id;
    const updatedSchedule = await examScheduleService.updateExamSchedule(scheduleId, req.body);
    res.status(200).json({ success: true, data: updatedSchedule });
  } catch (error) {
    if (error.message === "Exam schedule not found" || error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete an exam schedule
 */
const deleteExamSchedule = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only owner/admin)
    const scheduleId = req.params.id;
    const result = await examScheduleService.deleteExamSchedule(scheduleId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Exam schedule not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllExamSchedules,
  getExamScheduleById,
  createExamSchedule,
  updateExamSchedule,
  deleteExamSchedule
};
