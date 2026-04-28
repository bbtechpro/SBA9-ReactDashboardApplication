import type { Task } from "../../types/index";
export const Stats = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.isCompleted).length;

  return (
    <div className={styles.statsCard}>
      <h3>Overview</h3>
      <div className={styles.statLine}>Done: <strong>{completed}/{total}</strong></div>
      <div className={styles.statLine}>Urgent: <span className={styles.badge}>{highPriority}</span></div>
      <progress value={completed} max={total} />
    </div>
  );
};
