module.exports = (sequelize, DataTypes) => {
  const ExamToken = sequelize.define('ExamToken', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    exam_schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamSchedules',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamSessions',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    expiry_time: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'exam_tokens',
    timestamps: false
  });

  ExamToken.associate = (models) => {
    ExamToken.belongsTo(models.ExamSchedule, { foreignKey: 'exam_schedule_id' });
    ExamToken.belongsTo(models.ExamSession, { foreignKey: 'session_id' });
    ExamToken.belongsTo(models.User, { foreignKey: 'created_by' });
  };

  return ExamToken;
};
