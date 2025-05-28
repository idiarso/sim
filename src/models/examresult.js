"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExamResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamResult.belongsTo(models.StudentProfile, { foreignKey: "id_siswa" });
      ExamResult.belongsTo(models.ExamSchedule, { foreignKey: "id_jadwal" });
    }
  }
  ExamResult.init(
    {
      id_nilai: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pg_benar: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      pg_nilai: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      essai_nilai: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
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
      kompleks_nilai: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      jodohkan_nilai: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      isian_nilai: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      dikoreksi: {
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
      modelName: "ExamResult",
      tableName: "cbt_nilai",
      timestamps: false,
      indexes: [
        {
          fields: ["id_siswa", "id_jadwal"],
        },
      ],
    }
  );
  return ExamResult;
};
