module.exports = (sequelize, DataTypes) => {
  const AssignmentSubmission = sequelize.define('AssignmentSubmission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assignments',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'StudentProfiles',
        key: 'id'
      }
    },
    submission_text: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    submission_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    is_late: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    graded_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    graded_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'assignment_submissions',
    timestamps: false
  });

  AssignmentSubmission.associate = (models) => {
    AssignmentSubmission.belongsTo(models.Assignment, { foreignKey: 'assignment_id' });
    AssignmentSubmission.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    AssignmentSubmission.belongsTo(models.TeacherProfile, { foreignKey: 'graded_by', as: 'Grader' });
  };

  return AssignmentSubmission;
};
