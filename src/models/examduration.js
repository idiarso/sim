"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExamDuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamDuration.belongsTo(models.StudentProfile, { foreignKey: "id_siswa" });
      ExamDuration.belongsTo(models.ExamSchedule, { foreignKey: "id_jadwal" });
    }
  }
  ExamDuration.init(
    {
      id_durasi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
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
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=belum ujian, 1=sedang ujian, 2=sudah ujian",
      },
      lama_ujian: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      mulai: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      selesai: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      reset: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=tidak, 1=reset dari 0, 2=reset dari sisa waktu, 3=ulangi semua",
      },
      time_create: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ExamDuration",
      tableName: "cbt_durasi_siswa",
      timestamps: false,
      indexes: [
        {
          fields: ["id_siswa", "id_jadwal"],
        },
      ],
    }
  );
  return ExamDuration;
};
