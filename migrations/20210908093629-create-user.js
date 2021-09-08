"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_super_user: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_locked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      start_active_datetime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      end_active_datetime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: "2999-12-31 23:59:59",
      },
      count_wrong_password: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "ANONYMUS",
      },
      created_datetime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "ANONYMUS",
      },
      updated_datetime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deleted_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: "1945-08-17 07:00:00",
      },
    });

    await queryInterface.addConstraint("users", {
      fields: ["email", "deleted", "deleted_datetime"],
      type: "unique",
      name: "uq_users_email",
    });

    await queryInterface.addConstraint("users", {
      fields: ["username", "deleted", "deleted_datetime"],
      type: "unique",
      name: "uq_users_username",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
