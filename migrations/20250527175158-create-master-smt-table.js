"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_smt", {
      id_smt: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      smt: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nama_smt: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      active: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("master_smt");
  },
};
