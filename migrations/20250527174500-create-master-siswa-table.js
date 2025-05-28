"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_siswa", {
      id_siswa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nisn: {
        // Assuming nisn is numeric but represented as string due to potential leading zeros
        // In MySQL it was INT(10) UNSIGNED ZEROFILL. PostgreSQL doesn't have ZEROFILL.
        // Store as STRING or BIGINT depending on whether arithmetic operations are needed.
        // Using STRING for safety as it's likely an identifier.
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true, // Assuming NISN should be unique
      },
      nis: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true, // Assuming NIS should be unique
      },
      nama: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT, // Storing potentially hashed passwords
        allowNull: false,
      },
      kelas_awal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tahun_masuk: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      sekolah_asal: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      tempat_lahir: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      tanggal_lahir: {
        // Storing as STRING as original format is unclear (varchar(30))
        // Could be DATEONLY if format is consistent and migration is possible
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      agama: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      hp: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(254),
        allowNull: true,
      },
      foto: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "siswa.png",
      },
      anak_ke: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_keluarga: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rt: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      rw: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      kelurahan: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      kecamatan: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      kabupaten: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provinsi: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nama_ayah: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      tgl_lahir_ayah: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pendidikan_ayah: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pekerjaan_ayah: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nohp_ayah: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      alamat_ayah: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nama_ibu: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      tgl_lahir_ibu: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pendidikan_ibu: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pekerjaan_ibu: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nohp_ibu: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      alamat_ibu: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nama_wali: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      tgl_lahir_wali: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pendidikan_wali: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pekerjaan_wali: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nohp_wali: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      alamat_wali: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nik: {
        type: Sequelize.STRING(30),
        allowNull: true, // Original schema had NOT NULL, but might be empty string?
      },
      warga_negara: {
        type: Sequelize.STRING(20),
        allowNull: true, // Original schema had NOT NULL, but might be empty string?
      },
      uid: {
        type: Sequelize.STRING(255),
        allowNull: true, // Original schema had NOT NULL, but might be empty string?
      },
      // Note: No id_user foreign key in original schema, assuming linkage is via username or other means
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("master_siswa");
  },
};
