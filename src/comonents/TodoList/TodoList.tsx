import { useCallback, useState, useMemo, useEffect } from "react";
import TodoComponent from "../TodoComponent/TodoComponent";
import TodoSkeleton from "../TodoSkeleton/TodoSkeleton";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import FilterBar from "../FilterBar/FilterBar";
import { addTodo, updateTodo, deleteTodo } from "../../api/api";
import { TodoType } from "../../types/todo";
import Button from "../Button/Button";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      setErrorMsg("Ошибка сохранения в localStorage:+" + err);
    }
  }, [todos]);

  const handleAddTodo = useCallback(async (title: string) => {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const updatedTodos = await addTodo(title);
      setTodos(updatedTodos);
      setNewTodo("");
    } catch (err) {
      setErrorMsg(`Ошибка при добавлении: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateTodo = useCallback(
    async (id: number, completed: boolean) => {
      try {
        const updatedTodos = await updateTodo(id, completed);
        setTodos(updatedTodos);
      } catch (err) {
        setErrorMsg(`Ошибка при обновлении: ${err}`);
      }
    },
    []
  );

  const handleDeleteTodo = useCallback(async (id: number) => {
    try {
      const updatedTodos = await deleteTodo(id);
      setTodos(updatedTodos);
    } catch (err) {
      setErrorMsg(`Ошибка при удалении: ${err}`);
    }
  }, []);

  const processedTodos = useMemo(() => {
    let result = [...todos];

    if (filter === "completed") {
      result = result.filter(todo => todo.completed);
    } else if (filter === "active") {
      result = result.filter(todo => !todo.completed);
    }

    return result;
  }, [todos, filter]);

  return (
    <div className="container mx-auto px-4 py-8">
      {errorMsg && (
        <ErrorPopup message={errorMsg} onClose={() => setErrorMsg(null)} />
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">Мои задачи</h1>

      <div className="bg-white rounded shadow p-6">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Что нужно сделать?"
          />
          <Button
            addTodoHandler={handleAddTodo}
            newTodo={newTodo}
            loading={isLoading}
          />
        </div>

        <FilterBar statusFilter={filter} onStatusChange={setFilter} />

        <ul className="space-y-3">
          {processedTodos.map(todo => (
            <TodoComponent
              key={todo.id}
              {...todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}

          {isLoading && <TodoSkeleton />}

          {!isLoading && processedTodos.length === 0 && (
            <li className="text-center text-gray-500 py-4">
              {filter === "all"
                ? "Нет задач. Добавьте что-нибудь!"
                : filter === "completed"
                ? "Нет выполненных задач"
                : "Нет активных задач"}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
