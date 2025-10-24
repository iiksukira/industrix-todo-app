import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Category from "./categoryModel.js";

const Todo = sequelize.define(
  "Todo",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
    },
    priority: { type: DataTypes.STRING, defaultValue: "medium" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "todos", timestamps: false }
);

Todo.belongsTo(Category, { foreignKey: "category_id", as: "category" });

export default Todo;
