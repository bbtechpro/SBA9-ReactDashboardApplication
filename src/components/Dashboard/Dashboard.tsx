import { useState } from 'react';
import { useMemo } from 'react';
import TaskList from '../TaskList/TaskList';
import Stats from '../Stats/Stats';
import type { Task } from '../../types/index';
import styles from './TaskDashboard.module.css';
import initialTasks from '../TaskList/TaskList'; // Import initial tasks from TaskList for demo purposes

export const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Communications: Handlers passed down to TaskList -> TaskItem
  const handleToggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className={styles.dashboardGrid}>
      <aside className={styles.sidebar}>
        <Stats tasks={tasks} />
      </aside>
      <main className={styles.main}>
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </main>
    </div>
  );
};
