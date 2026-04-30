import { useState } from 'react';
import type { Task } from '../../types';
import { validateTaskInput, type TaskValidationErrors } from '../../utils/TaskUtils';

type TaskFormValues = Pick<Task, 'name' | 'description' | 'priority' | 'dueDate'>;

interface TaskFormProps {
  onSave: (task: TaskFormValues) => void;
  initialData?: Partial<TaskFormValues>;
}

const DEFAULT_VALUES: TaskFormValues = {
  name: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

export function TaskForm({ initialData, onSave }: TaskFormProps) {
  const [task, setTask] = useState<TaskFormValues>({ ...DEFAULT_VALUES, ...initialData });
  const [errors, setErrors] = useState<TaskValidationErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTaskInput(task);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(task);
    setTask(DEFAULT_VALUES);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        value={task.name}
        onChange={(event) => setTask((prev) => ({ ...prev, name: event.target.value }))}
        placeholder="Task name"
        style={{ marginRight: '0.5rem' }}
      />
      {errors.name && <p role="alert">{errors.name}</p>}

      <input
        value={task.description}
        onChange={(event) => setTask((prev) => ({ ...prev, description: event.target.value }))}
        placeholder="Task description"
        style={{ marginRight: '0.5rem' }}
      />
      {errors.description && <p role="alert">{errors.description}</p>}

      <select
        value={task.priority}
        onChange={(event) =>
          setTask((prev) => ({
            ...prev,
            priority: event.target.value as Task['priority'],
          }))
        }
        style={{ marginRight: '0.5rem' }}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <input
        type="date"
        value={task.dueDate}
        onChange={(event) => setTask((prev) => ({ ...prev, dueDate: event.target.value }))}
        style={{ marginRight: '0.5rem' }}
      />
      {errors.dueDate && <p role="alert">{errors.dueDate}</p>}

      <button type="submit">{initialData ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}
