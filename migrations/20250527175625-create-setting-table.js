"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("setting", {
      id_setting: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode_sekolah: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      sekolah: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      npsn: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      nss: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      desa: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      kecamatan: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      kota: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      provinsi: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      kode_pos: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      telp: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      fax: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      web: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      nama_kpl: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      nip_kpl: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      logo_kiri: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      logo_kanan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tanda_tangan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      stampel: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      login_logo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      versi: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      ip_server: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      waktu: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      server: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_server: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      sekolah_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      db_versi: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("setting");
  },
};
