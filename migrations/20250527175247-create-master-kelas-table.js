"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_kelas", {
      id_kelas: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_tp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "master_tp",
          key: "id_tp",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_smt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "master_smt",
          key: "id_smt",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nama_kelas: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      kode_kelas: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      guru_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_guru",
          key: "id_guru",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      siswa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jumlah_siswa: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      set_siswa: {
        type: Sequelize.STRING(1),
        allowNull: true,
        defaultValue: "0",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("master_kelas");
  },
};
