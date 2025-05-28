module.exports = (sequelize, DataTypes) => {
  const TeacherJournal = sequelize.define('TeacherJournal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
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
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subjects',
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
      allowNull: false
    },
    material_topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    learning_methods: {
      type: DataTypes.STRING,
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
    tableName: 'teacher_journals',
    timestamps: false
  });

  TeacherJournal.associate = (models) => {
    TeacherJournal.belongsTo(models.TeacherProfile, { foreignKey: 'teacher_id' });
    TeacherJournal.belongsTo(models.Class, { foreignKey: 'class_id' });
    TeacherJournal.belongsTo(models.Subject, { foreignKey: 'subject_id' });
    TeacherJournal.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    TeacherJournal.belongsTo(models.Semester, { foreignKey: 'semester_id' });
  };

  return TeacherJournal;
};
