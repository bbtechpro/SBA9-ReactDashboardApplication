import type { Task } from "../../types/index";
export const Stats = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.isCompleted).length;
  const completionPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
      <h3>Overview</h3>
      <div>Done: <strong>{completed}/{total}</strong></div>
      <div>Urgent: <span>{highPriority}</span></div>
      <progress value={completionPercent} max={100} style={{ width: '100%' }} />
    </div>
  );
};
