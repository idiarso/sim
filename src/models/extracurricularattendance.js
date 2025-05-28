module.exports = (sequelize, DataTypes) => {
  const ExtracurricularAttendance = sequelize.define('ExtracurricularAttendance', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'sick', 'permission'),
      allowNull: false,
      defaultValue: 'present'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
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
    tableName: 'extracurricular_attendances',
    timestamps: false
  });

  ExtracurricularAttendance.associate = (models) => {
    ExtracurricularAttendance.belongsTo(models.Extracurricular, { foreignKey: 'extracurricular_id' });
    ExtracurricularAttendance.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    ExtracurricularAttendance.belongsTo(models.User, { foreignKey: 'created_by' });
  };

  return ExtracurricularAttendance;
};
