"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // No associations for settings table
    }
  }
  Setting.init(
    {
      id_setting: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      kode_sekolah: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      sekolah: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      npsn: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      nss: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      desa: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      kecamatan: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      kota: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      provinsi: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      kode_pos: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      telp: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      fax: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      web: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      nama_kpl: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      nip_kpl: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      logo_kiri: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logo_kanan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tanda_tangan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stampel: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      login_logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      versi: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      ip_server: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      waktu: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      server: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      id_server: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      sekolah_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      db_versi: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Setting",
      tableName: "setting",
      timestamps: false,
    }
  );
  return Setting;
};
