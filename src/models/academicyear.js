"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AcademicYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AcademicYear.hasMany(models.Class, { foreignKey: "id_tp" });
      AcademicYear.hasMany(models.ClassStudent, { foreignKey: "id_tp" });
      AcademicYear.hasMany(models.ExamSchedule, { foreignKey: "id_tp" });
      AcademicYear.hasMany(models.FinalGrade, { foreignKey: "id_tp" });
    }
  }
  AcademicYear.init(
    {
      id_tp: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tahun: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AcademicYear",
      tableName: "master_tp",
      timestamps: false,
    }
  );
  return AcademicYear;
};
