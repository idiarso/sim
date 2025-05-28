"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StudentQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentQuestion.belongsTo(models.QuestionBank, { foreignKey: "id_bank" });
      StudentQuestion.belongsTo(models.ExamSchedule, { foreignKey: "id_jadwal" });
      StudentQuestion.belongsTo(models.Question, { foreignKey: "id_soal" });
      StudentQuestion.belongsTo(models.StudentProfile, { foreignKey: "id_siswa" });
    }
  }
  StudentQuestion.init(
    {
      id_soal_siswa: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(15),
      },
      id_bank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_bank_soal",
          key: "id_bank",
        },
      },
      id_jadwal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_jadwal",
          key: "id_jadwal",
        },
      },
      id_soal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_soal",
          key: "id_soal",
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
      jenis_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      no_soal_alias: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      opsi_alias_a: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      opsi_alias_b: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      opsi_alias_c: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      opsi_alias_d: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      opsi_alias_e: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      jawaban_alias: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      jawaban_siswa: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      jawaban_benar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      point_essai: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      soal_end: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      point_soal: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: "0",
      },
      nilai_koreksi: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: "0",
      },
      nilai_otomatis: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=otomatis, 1=dari guru",
      },
      time_create: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "StudentQuestion",
      tableName: "cbt_soal_siswa",
      timestamps: false,
      indexes: [
        {
          fields: ["id_siswa", "id_jadwal"],
        },
        {
          fields: ["id_bank", "id_soal"],
        },
      ],
    }
  );
  return StudentQuestion;
};
