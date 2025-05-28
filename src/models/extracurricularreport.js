module.exports = (sequelize, DataTypes) => {
  const ExtracurricularReport = sequelize.define('ExtracurricularReport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    report_card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ReportCards',
        key: 'id'
      }
    },
    extracurricular_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Extracurriculars',
        key: 'id'
      }
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coach_notes: {
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
    tableName: 'extracurricular_reports',
    timestamps: false
  });

  ExtracurricularReport.associate = (models) => {
    ExtracurricularReport.belongsTo(models.ReportCard, { foreignKey: 'report_card_id' });
    ExtracurricularReport.belongsTo(models.Extracurricular, { foreignKey: 'extracurricular_id' });
  };

  return ExtracurricularReport;
};
