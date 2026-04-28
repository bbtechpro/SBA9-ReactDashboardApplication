import './App.css'
import TaskList from './components/TaskList/TaskList';


function App() {
  return (
    <section id="center">
      <h1>Task Manager</h1>
      <div className="card">
        <TaskList />
      </div>
    </section>
  );
}

export default App
