"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("kelas_siswa", {
      id_kelas_siswa: {
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
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Student removal might remove class assignment
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_kelas",
          key: "id_kelas",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Class removal might remove student assignment
      },
    });

    // Add a unique constraint for the combination of tp, smt, siswa, kelas
    await queryInterface.addConstraint("kelas_siswa", {
      fields: ["id_tp", "id_smt", "id_siswa", "id_kelas"],
      type: "unique",
      name: "kelas_siswa_unique_constraint",
    });

    // Add indexes for querying by class or student
    await queryInterface.addIndex("kelas_siswa", ["id_kelas"]);
    await queryInterface.addIndex("kelas_siswa", ["id_siswa"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "kelas_siswa",
      "kelas_siswa_unique_constraint"
    );
    await queryInterface.removeIndex("kelas_siswa", ["id_kelas"]);
    await queryInterface.removeIndex("kelas_siswa", ["id_siswa"]);
    await queryInterface.dropTable("kelas_siswa");
  },
};
