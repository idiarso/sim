"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeacherProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeacherProfile.belongsTo(models.User, { foreignKey: "id_user" });
      TeacherProfile.hasMany(models.Class, { foreignKey: "guru_id" });
    }
  }
  TeacherProfile.init(
    {
      id_guru: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      nip: {
        type: DataTypes.CHAR(30),
        allowNull: false,
      },
      nama_guru: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      kode_guru: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      no_ktp: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      tempat_lahir: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      tgl_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      jenis_kelamin: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      agama: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      no_hp: {
        type: DataTypes.STRING(13),
        allowNull: true,
      },
      alamat_jalan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rt_rw: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      dusun: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      kelurahan: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      kecamatan: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      kabupaten: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      provinsi: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      kode_pos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kewarganegaraan: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      nuptk: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      jenis_ptk: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      tgs_tambahan: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status_pegawai: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status_aktif: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      status_nikah: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      tmt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      keahlian_isyarat: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      npwp: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      foto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TeacherProfile",
      tableName: "master_guru",
      timestamps: false,
    }
  );
  return TeacherProfile;
};
