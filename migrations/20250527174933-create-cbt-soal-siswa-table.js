"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_soal_siswa", {
      id_soal_siswa: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(15), // Original was VARCHAR(15)
      },
      id_bank: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_bank_soal",
          key: "id_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_jadwal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_jadwal",
          key: "id_jadwal",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_soal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_soal",
          key: "id_soal",
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
        onDelete: "CASCADE",
      },
      jenis_soal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      no_soal_alias: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opsi_alias_a: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      opsi_alias_b: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      opsi_alias_c: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      opsi_alias_d: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      opsi_alias_e: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      jawaban_alias: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_siswa: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jawaban_benar: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      point_essai: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      soal_end: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      point_soal: {
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: "0",
      },
      nilai_koreksi: {
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: "0",
      },
      nilai_otomatis: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=otomatis, 1=dari guru",
      },
      time_create: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes for frequently queried columns
    await queryInterface.addIndex("cbt_soal_siswa", ["id_siswa", "id_jadwal"]);
    await queryInterface.addIndex("cbt_soal_siswa", ["id_bank", "id_soal"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("cbt_soal_siswa", ["id_siswa", "id_jadwal"]);
    await queryInterface.removeIndex("cbt_soal_siswa", ["id_bank", "id_soal"]);
    await queryInterface.dropTable("cbt_soal_siswa");
  },
};
