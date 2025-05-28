const db = require("../models");
const Subject = db.Subject;

/**
 * Get all subjects
 */
const getAllSubjects = async () => {
  try {
    return await Subject.findAll();
  } catch (error) {
    console.error("Error fetching all subjects:", error);
    throw error;
  }
};

/**
 * Get a single subject by ID
 */
const getSubjectById = async (subjectId) => {
  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }
    return subject;
  } catch (error) {
    console.error(`Error fetching subject ${subjectId}:`, error);
    throw error;
  }
};

/**
 * Create a new subject
 */
const createSubject = async (subjectData) => {
  try {
    const newSubject = await Subject.create(subjectData);
    return newSubject;
  } catch (error) {
    console.error("Error creating subject:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(`Subject with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Update an existing subject
 */
const updateSubject = async (subjectId, updateData) => {
  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }
    await subject.update(updateData);
    return await Subject.findByPk(subjectId);
  } catch (error) {
    console.error(`Error updating subject ${subjectId}:`, error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(`Subject with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Delete a subject
 */
const deleteSubject = async (subjectId) => {
  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }
    // Check deletable flag
    if (subject.deletable === 0) {
      throw new Error("Subject cannot be deleted");
    }
    // TODO: Check if subject is used in question banks, etc.
    await subject.destroy();
    return { message: "Subject deleted successfully" };
  } catch (error) {
    console.error(`Error deleting subject ${subjectId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};
