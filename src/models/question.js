"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.QuestionBank, { foreignKey: "bank_id" });
      Question.belongsTo(models.Subject, { foreignKey: "mapel_id" });
      Question.hasMany(models.StudentQuestion, { foreignKey: "id_soal" });
    }
  }
  Question.init(
    {
      id_soal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bank_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_bank_soal",
          key: "id_bank",
        },
      },
      mapel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
          model: "master_mapel",
          key: "id_mapel",
        },
      },
      jenis: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "1=ganda, 2=ganda kompleks, 3=menjodohkan, 4=isian singkat, 5=uraian",
      },
      nomor_soal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      file: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      file1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tipe_file: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      soal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      opsi_a: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      opsi_b: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      opsi_c: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      opsi_d: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      opsi_e: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file_a: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      file_b: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      file_c: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      file_d: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      file_e: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      jawaban: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_on: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_on: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tampilkan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      kesulitan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "tingkat kesulitan 1-10",
      },
      timer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=tidak, 1=ya",
      },
      timer_menit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "cbt_soal",
      timestamps: false,
    }
  );
  return Question;
};
