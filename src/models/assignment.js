module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subjects',
        key: 'id'
      }
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id'
      }
    },
    academic_year_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AcademicYears',
        key: 'id'
      }
    },
    semester_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Semesters',
        key: 'id'
      }
    },
    publish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    max_score: {
      type: DataTypes.FLOAT,
      defaultValue: 100
    },
    allow_late_submission: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'assignments',
    timestamps: false
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.TeacherProfile, { foreignKey: 'teacher_id' });
    Assignment.belongsTo(models.Subject, { foreignKey: 'subject_id' });
    Assignment.belongsTo(models.Class, { foreignKey: 'class_id' });
    Assignment.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    Assignment.belongsTo(models.Semester, { foreignKey: 'semester_id' });
    Assignment.hasMany(models.AssignmentSubmission, { foreignKey: 'assignment_id' });
  };

  return Assignment;
};
