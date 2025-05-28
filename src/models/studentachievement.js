module.exports = (sequelize, DataTypes) => {
  const StudentAchievement = sequelize.define('StudentAchievement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    report_card_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ReportCards',
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
    achievement_type: {
      type: DataTypes.ENUM('academic', 'non-academic', 'sports', 'arts', 'other'),
      allowNull: false
    },
    achievement_level: {
      type: DataTypes.ENUM('school', 'district', 'city', 'province', 'national', 'international'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    achievement_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    certificate_path: {
      type: DataTypes.STRING,
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
    tableName: 'student_achievements',
    timestamps: false
  });

  StudentAchievement.associate = (models) => {
    StudentAchievement.belongsTo(models.ReportCard, { foreignKey: 'report_card_id' });
    StudentAchievement.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
  };

  return StudentAchievement;
};
