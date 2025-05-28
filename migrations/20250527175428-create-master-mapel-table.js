"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_mapel", {
      id_mapel: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_mapel: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      kode: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      kelompok: {
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: "-",
      },
      bobot_p: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bobot_k: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jenjang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      urutan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      deletable: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      urutan_tampil: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("master_mapel");
  },
};
