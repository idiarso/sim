"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ip_address: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(254),
        allowNull: true,
        unique: true,
      },
      activation_selector: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      activation_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      forgotten_password_selector: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      forgotten_password_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      forgotten_password_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      remember_selector: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      remember_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_on: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      last_login: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
