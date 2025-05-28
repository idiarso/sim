"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class QuestionBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionBank.belongsTo(models.TeacherProfile, { foreignKey: "bank_guru_id" });
      QuestionBank.belongsTo(models.Subject, { foreignKey: "bank_mapel_id" });
      // Assuming Major model exists for bank_jurusan_id
      // QuestionBank.belongsTo(models.Major, { foreignKey: "bank_jurusan_id" });
      // Assuming ExamType model exists for bank_jenis_id
      // QuestionBank.belongsTo(models.ExamType, { foreignKey: "bank_jenis_id" });
      QuestionBank.belongsTo(models.AcademicYear, { foreignKey: "id_tp" });
      QuestionBank.belongsTo(models.Semester, { foreignKey: "id_smt" });
      QuestionBank.hasMany(models.Question, { foreignKey: "bank_id" });
      QuestionBank.hasMany(models.ExamSchedule, { foreignKey: "id_bank" });
      QuestionBank.hasMany(models.StudentQuestion, { foreignKey: "id_bank" });
    }
  }
  QuestionBank.init(
    {
      id_bank: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bank_jenis_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bank_kode: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "0",
      },
      bank_level: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      bank_kelas: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bank_mapel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_mapel",
          key: "id_mapel",
        },
      },
      bank_jurusan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bank_guru_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_guru",
          key: "id_guru",
        },
      },
      bank_nama: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      kkm: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      jml_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jml_esai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_pg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_esai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_pg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_esai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      opsi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      soal_agama: {
        type: DataTypes.STRING(20),
        allowNull: true,
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
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      jml_kompleks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_kompleks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_kompleks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jml_jodohkan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_jodohkan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_jodohkan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jml_isian: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_isian: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_isian: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=belum selesai, 1=sudah selesai",
      },
    },
    {
      sequelize,
      modelName: "QuestionBank",
      tableName: "cbt_bank_soal",
      timestamps: false,
    }
  );
  return QuestionBank;
};
