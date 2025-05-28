const classroomService = require("../services/classroom.service");

/**
 * Get all class materials
 */
const getAllMaterials = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., student/teacher in the class)
    // Extract filters from query parameters
    const filters = {
      classId: req.query.classId,
      subjectId: req.query.subjectId,
      teacherId: req.query.teacherId,
      academicYearId: req.query.academicYearId,
      semesterId: req.query.semesterId
    };
    // Remove undefined filters
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

    const materials = await classroomService.getAllMaterials(filters);
    res.status(200).json({ success: true, data: materials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single class material by ID
 */
const getMaterialById = async (req, res) => {
  try {
    // TODO: Add authorization check
    const materialId = req.params.id;
    const material = await classroomService.getMaterialById(materialId);
    res.status(200).json({ success: true, data: material });
  } catch (error) {
    if (error.message === "Class material not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new class material
 */
const createMaterial = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., teacher only)
    // TODO: Add input validation
    // TODO: Handle file uploads if material includes files
    
    // Assign teacher ID from authenticated user if applicable
    // const teacherId = req.auth.teacherId; // Assuming teacherId is in JWT payload
    // req.body.id_guru = teacherId;
    
    const newMaterial = await classroomService.createMaterial(req.body);
    res.status(201).json({ success: true, data: newMaterial });
  } catch (error) {
    if (error.message.includes("not found")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing class material
 */
const updateMaterial = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., owner teacher or admin)
    // TODO: Add input validation
    // TODO: Handle file updates/deletions
    const materialId = req.params.id;
    const updatedMaterial = await classroomService.updateMaterial(materialId, req.body);
    res.status(200).json({ success: true, data: updatedMaterial });
  } catch (error) {
    if (error.message === "Class material not found" || error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a class material
 */
const deleteMaterial = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., owner teacher or admin)
    // TODO: Handle file deletion from storage
    const materialId = req.params.id;
    const result = await classroomService.deleteMaterial(materialId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "Class material not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// TODO: Add controllers for assignments, attendance, notes

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
  // Export other classroom controllers here
};
