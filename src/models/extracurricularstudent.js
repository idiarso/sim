module.exports = (sequelize, DataTypes) => {
  const ExtracurricularStudent = sequelize.define('ExtracurricularStudent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    extracurricular_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Extracurriculars',
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
    join_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
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
    tableName: 'extracurricular_students',
    timestamps: false
  });

  ExtracurricularStudent.associate = (models) => {
    ExtracurricularStudent.belongsTo(models.Extracurricular, { foreignKey: 'extracurricular_id' });
    ExtracurricularStudent.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    ExtracurricularStudent.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    ExtracurricularStudent.belongsTo(models.Semester, { foreignKey: 'semester_id' });
  };

  return ExtracurricularStudent;
};
