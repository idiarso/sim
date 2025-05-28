module.exports = (sequelize, DataTypes) => {
  const LearningMaterial = sequelize.define('LearningMaterial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
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
    publish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_published: {
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
    tableName: 'learning_materials',
    timestamps: false
  });

  LearningMaterial.associate = (models) => {
    LearningMaterial.belongsTo(models.TeacherProfile, { foreignKey: 'teacher_id' });
    LearningMaterial.belongsTo(models.Subject, { foreignKey: 'subject_id' });
    LearningMaterial.belongsTo(models.Class, { foreignKey: 'class_id' });
    LearningMaterial.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    LearningMaterial.belongsTo(models.Semester, { foreignKey: 'semester_id' });
  };

  return LearningMaterial;
};
