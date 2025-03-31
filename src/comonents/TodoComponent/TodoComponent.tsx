import { useState } from "react";

type TodoComponentProps = {
  title: string;
  completed: boolean;
  id: number;
  onUpdate: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const TodoComponent = ({
  title,
  completed,
  id,
  onUpdate,
  onDelete,
}: TodoComponentProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(id, !completed);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded hover:shadow transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleUpdate}
            disabled={isUpdating}
            className={`h-4 w-4 accent-blue-500 cursor-pointer ${
              isUpdating ? "opacity-0" : ""
            }`}
          />
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        <h3
          className={`text-sm truncate ${
            completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {title}
        </h3>
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="ml-4 text-gray-400 hover:text-red-500 transition-colors relative w-4 h-4 flex items-center justify-center"
        aria-label="Удалить задачу"
      >
        {isDeleting ? (
          <div className="animate-spin h-4 w-4 border-2 border-red-500 rounded-full border-t-transparent"></div>
        ) : (
          "✕"
        )}
      </button>
    </li>
  );
};

export default TodoComponent;
