export type FilterStatus = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}
export default TaskFilter;