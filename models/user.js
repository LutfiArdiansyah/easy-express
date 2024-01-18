"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or sequelize.UUIDV1
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          notNull: true,
          notEmpty: true,
          len: [6, 25],
        },
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
        },
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notNull: true,
          notEmpty: true,
          len: [3, 25],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notNull: true,
          notEmpty: true,
          len: [3, 25],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isSuperUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      startActiveDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
        },
      },
      endActiveDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "2999-12-31 23:59:59",
        validate: {
          isDate: true,
        },
      },
      countWrongPassword: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isNumeric: true,
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ANONYMUS",
      },
      createdDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ANONYMUS",
      },
      updatedDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "1945-08-17 07:00:00",
      },
    },
    {
      sequelize,
      modelName: "user",
      defaultScope: {
        where: {
          deleted: false,
        },
      },
      timestamps: false,
      underscored: true,
    }
  );
  return user;
};
