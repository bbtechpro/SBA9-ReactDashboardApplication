import { useState } from 'react';
import TaskFilter from '../TaskFilter/TaskFilter';
import type { FilterStatus } from '../TaskFilter/TaskFilter';
import { TaskItem } from '../TaskList/TaskItem';
import type { Task } from '../../types/index';
import styles from './TaskList.module.css';

const initialTasks: Task[] = [
  { id: 't1', name: 'Wash dishes', isCompleted: false, priority: 'medium', status: 'pending', description: 'Clean all the dishes in the sink', dueDate: '2024-07-01' },
  { id: 't2', name: 'Mow grass', isCompleted: false, priority: 'high', status: 'pending', description: 'Mow the front and back lawn', dueDate: '2024-07-02' },
  { id: 't3', name: 'Take out trash', isCompleted: true, priority: 'low', status: 'completed', description: 'Take the trash out to the curb', dueDate: '2024-06-30' },
];

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const handleToggle = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <div>
      <h2>Tasks</h2>
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      <ul className={styles.taskList}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks left! Great job.</p>}
      {tasks.length > 0 && filteredTasks.length === 0 && (
        <p>No tasks match this filter.</p>
      )}
    </div>
  );
}
// 1. Define the weights outside the component
const PRIORITY_WEIGHTS: Record<string, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

// 2. Sort the filtered results
const sortedFilteredTasks = [...filteredTasks].sort((a, b) => {
  return PRIORITY_WEIGHTS[a.priority] - PRIORITY_WEIGHTS[b.priority];
});

// 3. Map over 'sortedFilteredTasks' instead of 'filteredTasks'
{sortedFilteredTasks.map((task) => (
  <TaskItem key={task.id} task={task} ... />
))}


export default TaskList;
