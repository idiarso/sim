module.exports = (sequelize, DataTypes) => {
  const ReportCardSetting = sequelize.define('ReportCardSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    grade_scale_type: {
      type: DataTypes.ENUM('numeric', 'letter', 'descriptive'),
      allowNull: false,
      defaultValue: 'numeric'
    },
    min_passing_grade: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 70.0
    },
    attendance_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 10.0
    },
    assignment_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 20.0
    },
    daily_test_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 20.0
    },
    midterm_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 20.0
    },
    final_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 30.0
    },
    show_rank: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    show_principal_signature: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    principal_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    principal_id_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    principal_signature_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_logo_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    report_header: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_footer: {
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
    tableName: 'report_card_settings',
    timestamps: false
  });

  ReportCardSetting.associate = (models) => {
    ReportCardSetting.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    ReportCardSetting.belongsTo(models.Semester, { foreignKey: 'semester_id' });
  };

  return ReportCardSetting;
};
