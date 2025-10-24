import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import todoRoutes from "./routes/todoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes);

// Test DB connection
sequelize.sync().then(() => console.log("✅ Database synced"));

export default app;
