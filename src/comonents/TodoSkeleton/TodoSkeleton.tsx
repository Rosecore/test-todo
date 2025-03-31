const TodoSkeleton = () => {
  return (
    <li className="flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded animate-pulse">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-4 w-4 bg-gray-200 rounded"></div>
    </li>
  );
};

export default TodoSkeleton;
