module.exports = (sequelize, DataTypes) => {
  const StudentExamSession = sequelize.define('StudentExamSession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'StudentProfiles',
        key: 'id'
      }
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamSessions',
        key: 'id'
      }
    },
    exam_schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamSchedules',
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'student_exam_sessions',
    timestamps: false
  });

  StudentExamSession.associate = (models) => {
    StudentExamSession.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    StudentExamSession.belongsTo(models.ExamSession, { foreignKey: 'session_id' });
    StudentExamSession.belongsTo(models.ExamSchedule, { foreignKey: 'exam_schedule_id' });
    StudentExamSession.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    StudentExamSession.belongsTo(models.Semester, { foreignKey: 'semester_id' });
  };

  return StudentExamSession;
};
