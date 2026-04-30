import { useState } from 'react';
import TaskList from '../TaskList/TaskList';
import { Stats } from '../Stats/Stats';
import type { Task } from '../../types/index';

const initialTasks: Task[] = [
  {
    id: 't1',
    name: 'Wash dishes',
    isCompleted: false,
    priority: 'medium',
    status: 'pending',
    description: 'Clean all the dishes in the sink',
    dueDate: '2024-07-01',
  },
  {
    id: 't2',
    name: 'Mow grass',
    isCompleted: false,
    priority: 'high',
    status: 'pending',
    description: 'Mow the front and back lawn',
    dueDate: '2024-07-02',
  },
  {
    id: 't3',
    name: 'Take out trash',
    isCompleted: true,
    priority: 'low',
    status: 'completed',
    description: 'Take the trash out to the curb',
    dueDate: '2024-06-30',
  },
];

export const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggle = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              status: task.isCompleted ? 'pending' : 'completed',
            }
          : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (taskData: Pick<Task, 'name' | 'description' | 'priority' | 'dueDate'>) => {
    const newTask: Task = {
      id: `t${Date.now()}`,
      name: taskData.name.trim(),
      description: taskData.description.trim(),
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      isCompleted: false,
      status: 'pending',
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
      <aside>
        <Stats tasks={tasks} />
      </aside>
      <main>
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onAddTask={handleAddTask}
        />
      </main>
    </div>
  );
};
