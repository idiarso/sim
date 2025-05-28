"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StudentProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentProfile.belongsToMany(models.Class, { 
        through: models.ClassStudent, 
        foreignKey: "id_siswa" 
      });
      StudentProfile.hasMany(models.ExamDuration, { 
        foreignKey: "id_siswa" 
      });
      StudentProfile.hasMany(models.StudentQuestion, { 
        foreignKey: "id_siswa" 
      });
      StudentProfile.hasMany(models.ExamResult, { 
        foreignKey: "id_siswa" 
      });
    }
  }
  StudentProfile.init(
    {
      id_siswa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nisn: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      nis: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      kelas_awal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tahun_masuk: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      sekolah_asal: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tempat_lahir: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tanggal_lahir: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      agama: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      hp: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "siswa.png",
      },
      anak_ke: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status_keluarga: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rt: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      rw: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      kelurahan: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      kecamatan: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      kabupaten: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provinsi: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      kode_pos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nama_ayah: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      tgl_lahir_ayah: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pendidikan_ayah: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pekerjaan_ayah: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      nohp_ayah: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alamat_ayah: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nama_ibu: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      tgl_lahir_ibu: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pendidikan_ibu: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pekerjaan_ibu: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      nohp_ibu: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alamat_ibu: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nama_wali: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      tgl_lahir_wali: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pendidikan_wali: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pekerjaan_wali: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      nohp_wali: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alamat_wali: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nik: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      warga_negara: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      uid: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StudentProfile",
      tableName: "master_siswa",
      timestamps: false,
    }
  );
  return StudentProfile;
};
