//Сначала хотела использовать jsonplaceholder, но насколько я поняла тут нет задачи пользоваться реальным апи
import { TodoType } from "../types/todo";
export const getTodos = async (): Promise<TodoType[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = localStorage.getItem("todos");
      if (typeof data === "string") {
        resolve(JSON.parse(data));
      } else {
        resolve([]);
      }
    }, 1000);
  });
};

export const updateTodo = async (
  id: number,
  completed: boolean
): Promise<TodoType[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = localStorage.getItem("todos");
      if (data) {
        const todos = JSON.parse(data);
        const updatedTodos = todos.map((todo: TodoType) => {
          if (todo.id === id) {
            return { ...todo, completed };
          }
          return todo;
        });
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        resolve(updatedTodos);
      } else {
        resolve([]);
      }
    }, 1000);
  });
};

export const addTodo = async (title: string): Promise<TodoType[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = localStorage.getItem("todos");
      if (data) {
        const todos = JSON.parse(data);
        const newTodo = { id: Date.now(), title, completed: false };
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        resolve(updatedTodos);
      } else {
        const newTodo = { id: Date.now(), title, completed: false };
        localStorage.setItem("todos", JSON.stringify([newTodo]));
        resolve([newTodo]);
      }
    }, 1000);
  });
};

export const deleteTodo = async (id: number): Promise<TodoType[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = localStorage.getItem("todos");
      if (data) {
        const todos = JSON.parse(data);
        const updatedTodos = todos.filter((todo: TodoType) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        resolve(updatedTodos);
      } else {
        resolve([]);
      }
    }, 1000);
  });
};
