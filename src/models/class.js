"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.AcademicYear, { foreignKey: "id_tp" });
      Class.belongsTo(models.Semester, { foreignKey: "id_smt" });
      Class.belongsTo(models.TeacherProfile, { foreignKey: "guru_id" });
      // Assuming Major model exists for jurusan_id
      // Class.belongsTo(models.Major, { foreignKey: "jurusan_id" });
      // Assuming Level model exists for level_id
      // Class.belongsTo(models.Level, { foreignKey: "level_id" });
      Class.belongsToMany(models.StudentProfile, { 
        through: models.ClassStudent, 
        foreignKey: "id_kelas" 
      });
      Class.hasMany(models.FinalGrade, { foreignKey: "id_kelas" });
    }
  }
  Class.init(
    {
      id_kelas: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_tp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "master_tp",
          key: "id_tp",
        },
      },
      id_smt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "master_smt",
          key: "id_smt",
        },
      },
      nama_kelas: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      kode_kelas: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      jurusan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      level_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      guru_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_guru",
          key: "id_guru",
        },
      },
      siswa_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      jumlah_siswa: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      set_siswa: {
        type: DataTypes.STRING(1),
        allowNull: true,
        defaultValue: "0",
      },
    },
    {
      sequelize,
      modelName: "Class",
      tableName: "master_kelas",
      timestamps: false,
    }
  );
  return Class;
};
