type FilterBarProps = {
  statusFilter: "all" | "completed" | "active";
  onStatusChange: (status: "all" | "completed" | "active") => void;
};

const FilterBar = ({ statusFilter, onStatusChange }: FilterBarProps) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Фильтр:</span>
        <select
          value={statusFilter}
          onChange={e =>
            onStatusChange(e.target.value as "all" | "completed" | "active")
          }
          className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">Все задачи</option>
          <option value="completed">Выполненные</option>
          <option value="active">Активные</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
