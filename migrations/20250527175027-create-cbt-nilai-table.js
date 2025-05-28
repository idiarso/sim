"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_nilai", {
      id_nilai: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pg_benar: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      pg_nilai: {
        // Original was VARCHAR(10), likely storing numeric score as string
        // Map to DECIMAL or FLOAT for actual numeric value, or keep as STRING
        // Using DECIMAL for precision
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      essai_nilai: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Or SET NULL
      },
      id_jadwal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_jadwal",
          key: "id_jadwal",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Or SET NULL
      },
      kompleks_nilai: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      jodohkan_nilai: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      isian_nilai: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      dikoreksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      time_create: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes
    await queryInterface.addIndex("cbt_nilai", ["id_siswa", "id_jadwal"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("cbt_nilai", ["id_siswa", "id_jadwal"]);
    await queryInterface.dropTable("cbt_nilai");
  },
};
