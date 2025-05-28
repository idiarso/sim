"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_bank_soal", {
      id_bank: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bank_jenis_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bank_kode: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "0",
      },
      bank_level: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
      bank_kelas: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bank_mapel_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bank_jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bank_guru_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_guru",
          key: "id_guru",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      bank_nama: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      kkm: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      jml_soal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jml_esai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_pg: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_esai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_pg: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_esai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      opsi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      soal_agama: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      id_tp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_smt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jml_kompleks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_kompleks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_kompleks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jml_jodohkan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_jodohkan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_jodohkan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jml_isian: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tampil_isian: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_isian: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status_soal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=belum selesai, 1=sudah selesai",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cbt_bank_soal");
  },
};
