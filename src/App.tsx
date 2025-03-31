import { useEffect } from "react";
import "./App.css";
import TodoList from "./comonents/TodoList/TodoList";

function App() {
  useEffect(() => {
    const existingTodos = localStorage.getItem("todos");
    if (!existingTodos) {
      localStorage.setItem(
        "todos",
        JSON.stringify([
          {
            id: 1,
            title: "Todo 1",
            completed: false,
          },
          {
            id: 2,
            title: "Todo 2",
            completed: true,
          },
        ])
      );
    }
  }, []);
  return <TodoList></TodoList>;
}

export default App;
