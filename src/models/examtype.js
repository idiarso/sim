module.exports = (sequelize, DataTypes) => {
  const ExamType = sequelize.define('ExamType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    tableName: 'exam_types',
    timestamps: false
  });

  ExamType.associate = (models) => {
    ExamType.hasMany(models.ExamSchedule, { foreignKey: 'exam_type_id' });
  };

  return ExamType;
};
