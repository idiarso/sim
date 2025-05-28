"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Associations are defined in User and Group models
    }
  }
  UserGroup.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserGroup",
      tableName: "users_groups",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "group_id"],
        },
      ],
    }
  );
  return UserGroup;
};
