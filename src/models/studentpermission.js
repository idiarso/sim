module.exports = (sequelize, DataTypes) => {
  const StudentPermission = sequelize.define('StudentPermission', {
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
    permission_type: {
      type: DataTypes.ENUM('leave_early', 'late_arrival', 'sick_leave', 'absence_permission', 'other'),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approved_by_duty_teacher: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    parent_confirmation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    parent_confirmation_method: {
      type: DataTypes.ENUM('phone', 'written_note', 'in_person', 'sms', 'other'),
      allowNull: true
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
    tableName: 'student_permissions',
    timestamps: false
  });

  StudentPermission.associate = (models) => {
    StudentPermission.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    StudentPermission.belongsTo(models.TeacherProfile, { foreignKey: 'approved_by_duty_teacher', as: 'DutyTeacher' });
  };

  return StudentPermission;
};
