import Todo from "../models/todoModel.js";
import Category from "../models/categoryModel.js";
import { Op } from "sequelize";

export const getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const todos = await Todo.findAndCountAll({
      where: search ? { title: { [Op.iLike]: `%${search}%` } } : {},
      include: [{ model: Category, as: "category" }],
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      data: todos.rows,
      pagination: {
        current_page: page,
        per_page: limit,
        total: todos.count,
        total_pages: Math.ceil(todos.count / limit),
      },
    });
  } catch (error) {
    console.error("🔥 Error in getTodos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    console.error("❌ Error in createTodo:", err.message);
    res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Todo.update(req.body, { where: { id } });
    if (updated) {
      const todo = await Todo.findByPk(id, {
        include: [{ model: Category, as: "category" }],
      });
      return res.json(todo);
    }
    res.status(404).json({ message: "Todo not found" });
  } catch (err) {
    console.error("❌ Error in updateTodo:", err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteTodo:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    const updatedTodo = await Todo.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    res.json(updatedTodo);
  } catch (err) {
    console.error("❌ Error in toggleComplete:", err.message);
    res.status(500).json({ message: err.message });
  }
};
