import { useState } from 'react';
import TaskFilter from '../TaskFilter/TaskFilter';
import { TaskItem } from '../TaskList/TaskItem';
import type { Task } from '../../types/index';
import { TaskForm } from '../TaskForm/TaskForm';
import {
  filterTasks,
  sortTasks,
  type FilterStatus,
  type SortDirection,
  type SortField,
} from '../../utils/TaskUtils';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTask: (taskData: Pick<Task, 'name' | 'description' | 'priority' | 'dueDate'>) => void;
}

function TaskList({ tasks, onToggle, onDelete, onAddTask }: TaskListProps) {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredTasks = filterTasks(tasks, { status: filter, searchTerm });
  const sortedFilteredTasks = sortTasks(filteredTasks, {
    field: sortField,
    direction: sortDirection,
  });

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm onSave={onAddTask} />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />
        <select
          value={sortField}
          onChange={(event) => setSortField(event.target.value as SortField)}
          aria-label="Sort field"
        >
          <option value="priority">Priority</option>
          <option value="dueDate">Due date</option>
          <option value="name">Name</option>
        </select>
        <select
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value as SortDirection)}
          aria-label="Sort direction"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
        {sortedFilteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks left! Great job.</p>}
      {tasks.length > 0 && sortedFilteredTasks.length === 0 && (
        <p>No tasks match this filter.</p>
      )}
    </div>
  );
}

export default TaskList;
