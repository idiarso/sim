module.exports = (sequelize, DataTypes) => {
  const StudentExamRoom = sequelize.define('StudentExamRoom', {
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
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamRooms',
        key: 'id'
      }
    },
    exam_number: {
      type: DataTypes.STRING,
      allowNull: true
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'student_exam_rooms',
    timestamps: false
  });

  StudentExamRoom.associate = (models) => {
    StudentExamRoom.belongsTo(models.StudentProfile, { foreignKey: 'student_id' });
    StudentExamRoom.belongsTo(models.ExamRoom, { foreignKey: 'room_id' });
    StudentExamRoom.belongsTo(models.AcademicYear, { foreignKey: 'academic_year_id' });
    StudentExamRoom.belongsTo(models.Semester, { foreignKey: 'semester_id' });
  };

  return StudentExamRoom;
};
