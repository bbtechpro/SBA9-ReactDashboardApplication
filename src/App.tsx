import './App.css'
import { TaskDashboard } from './components/Dashboard/Dashboard';


function App() {
  return (
    <section id="center">
      <h1>Task Manager</h1>
      <div className="card">
        <TaskDashboard />
      </div>
    </section>
  );
}

export default App
