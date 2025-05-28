"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_guru", {
      id_guru: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      nip: {
        type: Sequelize.CHAR(30),
        allowNull: false,
      },
      nama_guru: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(254),
        allowNull: true,
      },
      kode_guru: {
        type: Sequelize.STRING(6),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      no_ktp: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      tempat_lahir: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      tgl_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      jenis_kelamin: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      agama: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      no_hp: {
        type: Sequelize.STRING(13),
        allowNull: true,
      },
      alamat_jalan: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      rt_rw: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      dusun: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      kelurahan: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      kecamatan: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      kabupaten: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      provinsi: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      kode_pos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      kewarganegaraan: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      nuptk: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      jenis_ptk: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      tgs_tambahan: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_pegawai: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_aktif: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_nikah: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      tmt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      keahlian_isyarat: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      npwp: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      foto: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("master_guru");
  },
};
