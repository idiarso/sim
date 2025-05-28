module.exports = (sequelize, DataTypes) => {
  const ClassAttendance = sequelize.define('ClassAttendance', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
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
    tableName: 'class_attendances',
    timestamps: false
  });

  ClassAttendance.associate = (models) => {
    ClassAttendance.belongsTo(models.Class, { foreignKey: 'class_id' });
    ClassAttendance.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    ClassAttendance.belongsTo(models.User, { foreignKey: 'created_by' });
  };

  return ClassAttendance;
};
