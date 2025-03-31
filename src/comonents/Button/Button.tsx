type ButtonProps = {
  addTodoHandler: (todo: string) => Promise<void>;
  newTodo: string;
  loading: boolean;
};

const Button = ({ addTodoHandler, newTodo, loading }: ButtonProps) => {
  return (
    <button
      onClick={() => addTodoHandler(newTodo)}
      disabled={loading || !newTodo.trim()}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Добавление..." : "Добавить"}
    </button>
  );
};

export default Button;
