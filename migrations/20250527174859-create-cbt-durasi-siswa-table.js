"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_durasi_siswa", {
      id_durasi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "master_siswa",
          key: "id_siswa",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Or SET NULL if duration record should persist
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
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=belum ujian, 1=sedang ujian, 2=sudah ujian",
      },
      lama_ujian: {
        // Original was TIME, map to INTERVAL or STRING
        // Using STRING for simplicity, application logic will handle parsing/formatting
        type: Sequelize.STRING(8), // HH:MM:SS
        allowNull: true,
      },
      mulai: {
        // Original was VARCHAR(22), likely storing datetime string
        // Map to TIMESTAMP WITH TIME ZONE for better handling
        type: Sequelize.DATE,
        allowNull: true,
      },
      selesai: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reset: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=tidak, 1=reset dari 0, 2=reset dari sisa waktu, 3=ulangi semua",
      },
      time_create: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes for frequently queried columns
    await queryInterface.addIndex("cbt_durasi_siswa", ["id_siswa", "id_jadwal"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("cbt_durasi_siswa", ["id_siswa", "id_jadwal"]);
    await queryInterface.dropTable("cbt_durasi_siswa");
  },
};
