"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExamSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamSchedule.belongsTo(models.AcademicYear, { foreignKey: "id_tp" });
      ExamSchedule.belongsTo(models.Semester, { foreignKey: "id_smt" });
      ExamSchedule.belongsTo(models.QuestionBank, { foreignKey: "id_bank" });
      // Assuming ExamType model exists for id_jenis
      // ExamSchedule.belongsTo(models.ExamType, { foreignKey: "id_jenis" });
      ExamSchedule.hasMany(models.ExamDuration, { foreignKey: "id_jadwal" });
      ExamSchedule.hasMany(models.StudentQuestion, { foreignKey: "id_jadwal" });
      ExamSchedule.hasMany(models.ExamResult, { foreignKey: "id_jadwal" });
      // Assuming ExamToken model exists
      // ExamSchedule.hasOne(models.ExamToken, { foreignKey: "id_jadwal" });
    }
  }
  ExamSchedule.init(
    {
      id_jadwal: {
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
      id_bank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_bank_soal",
          key: "id_bank",
        },
      },
      id_jenis: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tgl_mulai: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      tgl_selesai: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      durasi_ujian: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pengawas: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      acak_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      acak_opsi: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hasil_tampil: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ulang: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reset_login: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rekap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jam_ke: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jarak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      time_create: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ExamSchedule",
      tableName: "cbt_jadwal",
      timestamps: false,
    }
  );
  return ExamSchedule;
};
