"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FinalGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FinalGrade.belongsTo(models.Subject, { foreignKey: "id_mapel" });
      FinalGrade.belongsTo(models.Class, { foreignKey: "id_kelas" });
      FinalGrade.belongsTo(models.StudentProfile, { foreignKey: "id_siswa" });
      FinalGrade.belongsTo(models.AcademicYear, { foreignKey: "id_tp" });
      FinalGrade.belongsTo(models.Semester, { foreignKey: "id_smt" });
    }
  }
  FinalGrade.init(
    {
      id_nilai_akhir: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_mapel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_mapel",
          key: "id_mapel",
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
      id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
        },
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
      nilai: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      akhir: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      predikat: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "FinalGrade",
      tableName: "rapor_nilai_akhir",
      timestamps: false,
      indexes: [
        {
          fields: ["id_siswa", "id_tp", "id_smt", "id_mapel"],
        },
        {
          fields: ["id_kelas"],
        },
      ],
    }
  );
  return FinalGrade;
};
