module.exports = (sequelize, DataTypes) => {
  const Extracurricular = sequelize.define('Extracurricular', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TeacherProfiles',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.STRING,
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
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_participants: {
      type: DataTypes.INTEGER,
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
    tableName: 'extracurriculars',
    timestamps: false
  });

  Extracurricular.associate = (models) => {
    Extracurricular.belongsTo(models.TeacherProfile, { foreignKey: 'coach_id', as: 'Coach' });
    Extracurricular.hasMany(models.ExtracurricularStudent, { foreignKey: 'extracurricular_id' });
    Extracurricular.hasMany(models.ExtracurricularAttendance, { foreignKey: 'extracurricular_id' });
  };

  return Extracurricular;
};
