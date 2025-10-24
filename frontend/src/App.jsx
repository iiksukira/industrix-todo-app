import React from "react";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";
import "antd/dist/reset.css";

const App = () => (
  <TodoProvider>
    <Home />
  </TodoProvider>
);

export default App;
