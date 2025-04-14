const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // associations if needed
    }
  }

  User.init(
    {
      userType: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        validate: {
          notNull: { msg: "userType is required" },
          notEmpty: { msg: "userType cannot be empty" },
          isIn: {
            args: [["0", "1", "2"]],
            msg: "userType must be one of '0', '1', or '2'",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "firstName is required" },
          notEmpty: { msg: "firstName cannot be empty" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "lastName is required" },
          notEmpty: { msg: "lastName cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "email is required" },
          notEmpty: { msg: "email cannot be empty" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
          notEmpty: { msg: "password cannot be empty" },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters long",
          },
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        set(value) {
          if (value !== this.password) {
            throw new AppError("Password and confirmPassword must match", 400);
          }
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
          }
        },
      },
    }
  );

  return User;
};
