module.exports = (sequelize, DataTypes) => {
  const ReportCard = sequelize.define('ReportCard', {
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
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
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
    homeroom_teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    rank_in_class: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_students: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attendance_present: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    attendance_sick: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    attendance_absent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    attendance_permission: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    behavior_grade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    behavior_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    social_grade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    social_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    health_condition: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    height_start: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    height_end: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weight_start: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weight_end: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    achievement_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    homeroom_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_promoted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    promoted_to_class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    principal_approval: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    homeroom_approval: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    report_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_final: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'report_cards',
    timestamps: false
  });

  ReportCard.associate = (models) => {
    ReportCard.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    ReportCard.belongsTo(models.Class, { foreignKey: 'class_id' });
    ReportCard.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    ReportCard.belongsTo(models.Semester, { foreignKey: 'semester_id' });
    ReportCard.belongsTo(models.TeacherProfile, { foreignKey: 'homeroom_teacher_id', as: 'HomeroomTeacher' });
    ReportCard.hasMany(models.ReportCardSubject, { foreignKey: 'report_card_id' });
    ReportCard.hasMany(models.StudentAchievement, { foreignKey: 'report_card_id' });
    ReportCard.hasMany(models.ExtracurricularReport, { foreignKey: 'report_card_id' });
  };

  return ReportCard;
};
