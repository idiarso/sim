"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_soal", {
      id_soal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bank_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_bank_soal",
          key: "id_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Or SET NULL if questions can exist without a bank
      },
      mapel_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      jenis: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "1=ganda, 2=ganda kompleks, 3=menjodohkan, 4=isian singkat, 5=uraian",
      },
      nomor_soal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      file: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      file1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tipe_file: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      soal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      opsi_a: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      opsi_b: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      opsi_c: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      opsi_d: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      opsi_e: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      file_a: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      file_b: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      file_c: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      file_d: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      file_e: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      jawaban: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_on: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_on: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tampilkan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      kesulitan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "tingkat kesulitan 1-10",
      },
      timer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=tidak, 1=ya",
      },
      timer_menit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cbt_soal");
  },
};
