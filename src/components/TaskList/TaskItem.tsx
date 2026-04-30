import type { Task } from '../../types/index';
import { formatDate, isOverdue } from '../../utils/TaskUtils';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  const priorityColor =
    task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#ca8a04' : '#16a34a';

  const overdue = !task.isCompleted && isOverdue(task.dueDate);

  return (
    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input type="checkbox" checked={task.isCompleted} onChange={() => onToggle(task.id)} />
        <div>
          <h3 style={{ margin: 0, textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            {task.name}
          </h3>
          <p style={{ margin: 0 }}>{task.description}</p>
          <small style={{ color: overdue ? '#dc2626' : '#6b7280' }}>
            Due: {formatDate(task.dueDate)} {overdue ? '(Overdue)' : ''}
          </small>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ color: priorityColor }}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <button onClick={() => onDelete(task.id)} type="button">
          Delete
        </button>
      </div>
    </li>
  );
};
