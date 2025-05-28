"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClassStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Associations are defined in Class and StudentProfile models
      ClassStudent.belongsTo(models.AcademicYear, { foreignKey: "id_tp" });
      ClassStudent.belongsTo(models.Semester, { foreignKey: "id_smt" });
      ClassStudent.belongsTo(models.Class, { foreignKey: "id_kelas" });
      ClassStudent.belongsTo(models.StudentProfile, { foreignKey: "id_siswa" });
    }
  }
  ClassStudent.init(
    {
      id_kelas_siswa: {
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
      id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
        },
      },
      id_kelas: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_kelas",
          key: "id_kelas",
        },
      },
    },
    {
      sequelize,
      modelName: "ClassStudent",
      tableName: "kelas_siswa",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["id_tp", "id_smt", "id_siswa", "id_kelas"],
        },
      ],
    }
  );
  return ClassStudent;
};
