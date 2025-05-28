"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_jurusan", {
      id_jurusan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_jurusan: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      kode_jurusan: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      mapel_peminatan: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("master_jurusan");
  },
};
