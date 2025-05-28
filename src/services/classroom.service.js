const db = require("../models");
const ClassMaterial = db.ClassMaterial;
const Class = db.Class;
const Subject = db.Subject;
const TeacherProfile = db.TeacherProfile;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;

/**
 * Get all class materials
 */
const getAllMaterials = async (filters = {}) => {
  try {
    const whereClause = {};
    
    // Apply filters if provided
    if (filters.classId) whereClause.id_kelas = filters.classId;
    if (filters.subjectId) whereClause.id_mapel = filters.subjectId;
    if (filters.teacherId) whereClause.id_guru = filters.teacherId;
    if (filters.academicYearId) whereClause.id_tp = filters.academicYearId;
    if (filters.semesterId) whereClause.id_smt = filters.semesterId;
    
    return await ClassMaterial.findAll({
      where: whereClause,
      include: [
        { model: Class },
        { model: Subject },
        { model: TeacherProfile },
        { model: AcademicYear },
        { model: Semester }
      ],
      order: [["created_at", "DESC"]]
    });
  } catch (error) {
    console.error("Error fetching class materials:", error);
    throw error;
  }
};

/**
 * Get a single class material by ID
 */
const getMaterialById = async (materialId) => {
  try {
    const material = await ClassMaterial.findByPk(materialId, {
      include: [
        { model: Class },
        { model: Subject },
        { model: TeacherProfile },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
    if (!material) {
      throw new Error("Class material not found");
    }
    return material;
  } catch (error) {
    console.error(`Error fetching class material ${materialId}:`, error);
    throw error;
  }
};

/**
 * Create a new class material
 */
const createMaterial = async (materialData) => {
  try {
    // Validate relationships
    if (materialData.id_kelas) {
      const classData = await Class.findByPk(materialData.id_kelas);
      if (!classData) throw new Error("Class not found");
    }
    
    if (materialData.id_mapel) {
      const subject = await Subject.findByPk(materialData.id_mapel);
      if (!subject) throw new Error("Subject not found");
    }
    
    if (materialData.id_guru) {
      const teacher = await TeacherProfile.findByPk(materialData.id_guru);
      if (!teacher) throw new Error("Teacher not found");
    }
    
    if (materialData.id_tp) {
      const academicYear = await AcademicYear.findByPk(materialData.id_tp);
      if (!academicYear) throw new Error("Academic year not found");
    }
    
    if (materialData.id_smt) {
      const semester = await Semester.findByPk(materialData.id_smt);
      if (!semester) throw new Error("Semester not found");
    }
    
    // Set timestamps
    const now = new Date();
    materialData.created_at = now;
    materialData.updated_at = now;
    
    const newMaterial = await ClassMaterial.create(materialData);
    
    // Return the created material with associations
    return await ClassMaterial.findByPk(newMaterial.id, {
      include: [
        { model: Class },
        { model: Subject },
        { model: TeacherProfile },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
  } catch (error) {
    console.error("Error creating class material:", error);
    throw error;
  }
};

/**
 * Update an existing class material
 */
const updateMaterial = async (materialId, updateData) => {
  try {
    const material = await ClassMaterial.findByPk(materialId);
    if (!material) {
      throw new Error("Class material not found");
    }
    
    // Validate relationships if they are being updated
    if (updateData.id_kelas) {
      const classData = await Class.findByPk(updateData.id_kelas);
      if (!classData) throw new Error("Class not found");
    }
    
    if (updateData.id_mapel) {
      const subject = await Subject.findByPk(updateData.id_mapel);
      if (!subject) throw new Error("Subject not found");
    }
    
    if (updateData.id_guru) {
      const teacher = await TeacherProfile.findByPk(updateData.id_guru);
      if (!teacher) throw new Error("Teacher not found");
    }
    
    if (updateData.id_tp) {
      const academicYear = await AcademicYear.findByPk(updateData.id_tp);
      if (!academicYear) throw new Error("Academic year not found");
    }
    
    if (updateData.id_smt) {
      const semester = await Semester.findByPk(updateData.id_smt);
      if (!semester) throw new Error("Semester not found");
    }
    
    // Update timestamp
    updateData.updated_at = new Date();
    
    await material.update(updateData);
    
    // Return the updated material with associations
    return await ClassMaterial.findByPk(materialId, {
      include: [
        { model: Class },
        { model: Subject },
        { model: TeacherProfile },
        { model: AcademicYear },
        { model: Semester }
      ]
    });
  } catch (error) {
    console.error(`Error updating class material ${materialId}:`, error);
    throw error;
  }
};

/**
 * Delete a class material
 */
const deleteMaterial = async (materialId) => {
  try {
    const material = await ClassMaterial.findByPk(materialId);
    if (!material) {
      throw new Error("Class material not found");
    }
    
    await material.destroy();
    return { message: "Class material deleted successfully" };
  } catch (error) {
    console.error(`Error deleting class material ${materialId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
};
