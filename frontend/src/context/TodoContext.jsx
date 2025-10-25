import React, { useState, useEffect } from "react";
import api from "../api/api";
import { TodoContext } from "./todoContext";

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_pages: 3,
  });

  const fetchTodos = async (page = 1, query = "", limit = 5) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/todos?page=${page}&limit=${limit}&search=${query}`
      );
      setTodos(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        fetchTodos,
        categories,
        fetchCategories,
        loading,
        search,
        setSearch,
        pagination,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
