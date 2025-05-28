"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.hasMany(models.QuestionBank, { foreignKey: "bank_mapel_id" });
      Subject.hasMany(models.Question, { foreignKey: "mapel_id" });
      Subject.hasMany(models.FinalGrade, { foreignKey: "id_mapel" });
    }
  }
  Subject.init(
    {
      id_mapel: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_mapel: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      kode: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      kelompok: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: "-",
      },
      bobot_p: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_k: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jenjang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      urutan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      deletable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      urutan_tampil: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Subject",
      tableName: "master_mapel",
      timestamps: false,
    }
  );
  return Subject;
};
