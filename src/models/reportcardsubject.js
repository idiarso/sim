module.exports = (sequelize, DataTypes) => {
  const ReportCardSubject = sequelize.define('ReportCardSubject', {
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
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subjects',
        key: 'id'
      }
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    assignment_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    daily_test_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    midterm_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    final_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    final_grade: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    letter_grade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    competency_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    teacher_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    minimum_competency: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    class_average: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    class_highest: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    class_lowest: {
      type: DataTypes.FLOAT,
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
    tableName: 'report_card_subjects',
    timestamps: false
  });

  ReportCardSubject.associate = (models) => {
    ReportCardSubject.belongsTo(models.ReportCard, { foreignKey: 'report_card_id' });
    ReportCardSubject.belongsTo(models.Subject, { foreignKey: 'subject_id' });
    ReportCardSubject.belongsTo(models.TeacherProfile, { foreignKey: 'teacher_id' });
  };

  return ReportCardSubject;
};
