const db = require("../models");
const TeacherProfile = db.TeacherProfile;
const User = db.User;
const bcrypt = require("bcryptjs");

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Get all teachers
 */
const getAllTeachers = async () => {
  try {
    return await TeacherProfile.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }]
    });
  } catch (error) {
    console.error("Error fetching all teachers:", error);
    throw error;
  }
};

/**
 * Get a single teacher by ID
 */
const getTeacherById = async (teacherId) => {
  try {
    const teacher = await TeacherProfile.findByPk(teacherId, {
      include: [{ model: User, attributes: { exclude: ["password"] } }]
    });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return teacher;
  } catch (error) {
    console.error(`Error fetching teacher ${teacherId}:`, error);
    throw error;
  }
};

/**
 * Create a new teacher
 */
const createTeacher = async (teacherData) => {
  try {
    // Start a transaction to ensure both user and teacher profile are created or neither
    const result = await db.sequelize.transaction(async (t) => {
      let userId = null;
      
      // If linking to an existing user
      if (teacherData.id_user) {
        // Verify user exists
        const user = await User.findByPk(teacherData.id_user, { transaction: t });
        if (!user) {
          throw new Error("User not found");
        }
        userId = user.id;
      } 
      // If creating a new user account
      else if (teacherData.username && teacherData.password) {
        // Hash the password
        const hashedPassword = await hashPassword(teacherData.password);
        
        // Create new user
        const newUser = await User.create({
          username: teacherData.username,
          password: hashedPassword,
          email: teacherData.email || null,
          first_name: teacherData.nama_guru.split(' ')[0] || '',
          last_name: teacherData.nama_guru.split(' ').slice(1).join(' ') || '',
          created_on: Math.floor(Date.now() / 1000),
          active: true
        }, { transaction: t });
        
        userId = newUser.id;
        
        // TODO: Assign teacher role to user
        // await newUser.addGroup(teacherRoleId, { transaction: t });
      }
      
      // Create teacher profile
      const newTeacher = await TeacherProfile.create({
        ...teacherData,
        id_user: userId
      }, { transaction: t });
      
      return newTeacher;
    });
    
    // Get the created teacher with user info
    const teacher = await TeacherProfile.findByPk(result.id_guru, {
      include: [{ model: User, attributes: { exclude: ["password"] } }]
    });
    
    return teacher;
  } catch (error) {
    console.error("Error creating teacher:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(`Teacher with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Update an existing teacher
 */
const updateTeacher = async (teacherId, updateData) => {
  try {
    const teacher = await TeacherProfile.findByPk(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    
    // Start a transaction
    const result = await db.sequelize.transaction(async (t) => {
      // Update user data if provided and user exists
      if (teacher.id_user && (updateData.username || updateData.password || updateData.email)) {
        const user = await User.findByPk(teacher.id_user, { transaction: t });
        if (user) {
          const userUpdateData = {};
          
          if (updateData.username) userUpdateData.username = updateData.username;
          if (updateData.email) userUpdateData.email = updateData.email;
          if (updateData.password) {
            userUpdateData.password = await hashPassword(updateData.password);
          }
          
          await user.update(userUpdateData, { transaction: t });
        }
      }
      
      // Remove user-specific fields from teacher update data
      const teacherUpdateData = { ...updateData };
      delete teacherUpdateData.username;
      delete teacherUpdateData.password;
      
      // Update teacher profile
      await teacher.update(teacherUpdateData, { transaction: t });
      
      return teacher;
    });
    
    // Get the updated teacher with user info
    const updatedTeacher = await TeacherProfile.findByPk(teacherId, {
      include: [{ model: User, attributes: { exclude: ["password"] } }]
    });
    
    return updatedTeacher;
  } catch (error) {
    console.error(`Error updating teacher ${teacherId}:`, error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(`Teacher with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Delete a teacher
 */
const deleteTeacher = async (teacherId) => {
  try {
    const teacher = await TeacherProfile.findByPk(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    
    // Start a transaction
    await db.sequelize.transaction(async (t) => {
      // Delete teacher profile
      await teacher.destroy({ transaction: t });
      
      // Optionally delete associated user
      // if (teacher.id_user) {
      //   const user = await User.findByPk(teacher.id_user, { transaction: t });
      //   if (user) {
      //     await user.destroy({ transaction: t });
      //   }
      // }
    });
    
    return { message: "Teacher deleted successfully" };
  } catch (error) {
    console.error(`Error deleting teacher ${teacherId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};
