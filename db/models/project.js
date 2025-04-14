"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Define associations here
      Project.belongsTo(models.User, { foreignKey: "createdBy" });
    }
  }

  Project.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "title cannot be null" },
          notEmpty: { msg: "title cannot be empty" },
        },
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      productImage: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: { msg: "productImage cannot be null" },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: { msg: "price cannot be null" },
          isDecimal: { msg: "price must be a decimal value" },
        },
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "shortDescription cannot be null" },
          notEmpty: { msg: "shortDescription cannot be empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "description cannot be null" },
          notEmpty: { msg: "description cannot be empty" },
        },
      },
      productUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "productUrl cannot be null" },
          isUrl: { msg: "Invalid product URL" },
        },
      },
      category: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: { msg: "category cannot be null" },
        },
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: { msg: "tags cannot be null" },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "project",
      paranoid: true,
    }
  );

  return Project;
};
