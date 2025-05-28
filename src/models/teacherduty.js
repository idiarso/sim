module.exports = (sequelize, DataTypes) => {
  const TeacherDuty = sequelize.define('TeacherDuty', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    day_of_week: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      allowNull: false
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'teacher_duties',
    timestamps: false
  });

  TeacherDuty.associate = (models) => {
    TeacherDuty.belongsTo(models.TeacherProfile, { foreignKey: 'teacher_id' });
    TeacherDuty.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    TeacherDuty.belongsTo(models.Semester, { foreignKey: 'semester_id' });
    TeacherDuty.hasMany(models.StudentPermission, { foreignKey: 'approved_by_duty_teacher' });
  };

  return TeacherDuty;
};
