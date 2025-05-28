const express = require("express");
const classroomController = require("../controllers/classroom.controller");

const router = express.Router();

// --- Class Material Routes ---

// GET /api/v1/classroom/materials - Get all class materials (with filters)
router.get("/materials", classroomController.getAllMaterials);

// GET /api/v1/classroom/materials/:id - Get a single class material by ID
router.get("/materials/:id", classroomController.getMaterialById);

// POST /api/v1/classroom/materials - Create a new class material
router.post("/materials", classroomController.createMaterial);

// PUT /api/v1/classroom/materials/:id - Update an existing class material
router.put("/materials/:id", classroomController.updateMaterial);

// DELETE /api/v1/classroom/materials/:id - Delete a class material
router.delete("/materials/:id", classroomController.deleteMaterial);

// --- Assignment Routes (To be added if needed) ---

// --- Attendance Routes (To be added if needed) ---

// --- Class Notes Routes (To be added if needed) ---

module.exports = router;
