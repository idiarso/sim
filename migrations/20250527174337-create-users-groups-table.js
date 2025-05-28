"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Or SET NULL, depending on requirements
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "groups", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Or SET NULL
      },
    });

    // Add a unique constraint for the combination of user_id and group_id
    await queryInterface.addConstraint("users_groups", {
      fields: ["user_id", "group_id"],
      type: "unique",
      name: "user_group_unique_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "users_groups",
      "user_group_unique_constraint"
    );
    await queryInterface.dropTable("users_groups");
  },
};
