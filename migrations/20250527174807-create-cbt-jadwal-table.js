"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cbt_jadwal", {
      id_jadwal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_tp: {
        // Original was CHAR(2), assuming it links to master_tp.id_tp (INT)
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_smt: {
        // Original was CHAR(2), assuming it links to master_smt.id_smt (INT)
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_bank: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cbt_bank_soal",
          key: "id_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // Or CASCADE if schedule should be deleted when bank is deleted
      },
      id_jenis: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // Assuming FK to cbt_jenis.id_jenis
      },
      tgl_mulai: {
        // Original was VARCHAR(20), storing as TIMESTAMP might be better if format is consistent
        // Sticking to STRING for now to match original flexibility
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      tgl_selesai: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      durasi_ujian: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pengawas: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      acak_soal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      acak_opsi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hasil_tampil: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      token: {
        type: Sequelize.INTEGER, // Original was INT, likely boolean flag (0/1)
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ulang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reset_login: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rekap: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jam_ke: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jarak: {
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

    // Add foreign key constraints if not handled by references above
    // await queryInterface.addConstraint('cbt_jadwal', {
    //   fields: ['id_tp'],
    //   type: 'foreign key',
    //   name: 'fk_jadwal_tp',
    //   references: {
    //     table: 'master_tp',
    //     field: 'id_tp'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
    // await queryInterface.addConstraint('cbt_jadwal', {
    //   fields: ['id_smt'],
    //   type: 'foreign key',
    //   name: 'fk_jadwal_smt',
    //   references: {
    //     table: 'master_smt',
    //     field: 'id_smt'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
    // await queryInterface.addConstraint('cbt_jadwal', {
    //   fields: ['id_jenis'],
    //   type: 'foreign key',
    //   name: 'fk_jadwal_jenis',
    //   references: {
    //     table: 'cbt_jenis',
    //     field: 'id_jenis'
    //   },
    //   onDelete: 'set null',
    //   onUpdate: 'cascade'
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('cbt_jadwal', 'fk_jadwal_tp');
    // await queryInterface.removeConstraint('cbt_jadwal', 'fk_jadwal_smt');
    // await queryInterface.removeConstraint('cbt_jadwal', 'fk_jadwal_jenis');
    await queryInterface.dropTable("cbt_jadwal");
  },
};
