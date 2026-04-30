import type { FilterStatus } from '../../utils/TaskUtils';

interface TaskFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <button
        type="button"
        onClick={() => onFilterChange('all')}
        disabled={currentFilter === 'all'}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => onFilterChange('active')}
        disabled={currentFilter === 'active'}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => onFilterChange('completed')}
        disabled={currentFilter === 'completed'}
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilter;