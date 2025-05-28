"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rapor_nilai_akhir", {
      id_nilai_akhir: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_mapel: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_mapel",
          key: "id_mapel",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_kelas",
          key: "id_kelas",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      nilai: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      akhir: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      predikat: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
    });

    // Add indexes
    await queryInterface.addIndex("rapor_nilai_akhir", [
      "id_siswa",
      "id_tp",
      "id_smt",
      "id_mapel",
    ]);
    await queryInterface.addIndex("rapor_nilai_akhir", ["id_kelas"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("rapor_nilai_akhir", [
      "id_siswa",
      "id_tp",
      "id_smt",
      "id_mapel",
    ]);
    await queryInterface.removeIndex("rapor_nilai_akhir", ["id_kelas"]);
    await queryInterface.dropTable("rapor_nilai_akhir");
  },
};
