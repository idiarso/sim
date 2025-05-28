"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Semester.hasMany(models.Class, { foreignKey: "id_smt" });
      Semester.hasMany(models.ClassStudent, { foreignKey: "id_smt" });
      Semester.hasMany(models.ExamSchedule, { foreignKey: "id_smt" });
      Semester.hasMany(models.FinalGrade, { foreignKey: "id_smt" });
    }
  }
  Semester.init(
    {
      id_smt: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      smt: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      nama_smt: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Semester",
      tableName: "master_smt",
      timestamps: false,
    }
  );
  return Semester;
};
