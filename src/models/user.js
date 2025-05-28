"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Group, { through: models.UserGroup, foreignKey: "user_id" });
      User.hasOne(models.TeacherProfile, { foreignKey: "id_user" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: true,
        unique: true,
      },
      activation_selector: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      activation_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      forgotten_password_selector: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      forgotten_password_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      forgotten_password_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      remember_selector: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      remember_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_on: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      last_login: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false, // No createdAt/updatedAt fields in the migration
    }
  );
  return User;
};
