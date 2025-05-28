"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_jenis", {
      id_jenis: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_jenis: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      kode_jenis: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cbt_jenis");
  },
};
