
import type { Task } from '../../types/index';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  const priorityColor =
    task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#ca8a04' : '#16a34a';

    return (<li className="flex items-center justify-between p-4 bg-white rounded shadow mb-2">
      <div className="flex items-center">
        <input  type="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggle(task.id)}
  );
};       <div className="ml-4"> 
            <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                {task.title}
            </h3>
            <p className={`text-sm ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                {task.description} 
            </p>
        </div>
      </div>
        <div className="flex items-center">
            <span className="text-sm mr-4" style={{ color: priorityColor }}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">
                Delete
            </button>
        </div>
    </li>);
}
