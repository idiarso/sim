"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_token", {
      id_token: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      auto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_jadwal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // Assuming FK to cbt_jadwal.id_jadwal
        // Add constraint separately if needed
      },
      time_create: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cbt_token");
  },
};
