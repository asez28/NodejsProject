import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-shahor max-w-md w-full p-10 ml-4 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-light">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
          >
            Delete 🗑️
          </button>
          <Link to={`/tasks/${task._id}`} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
            Edit ✍️
          </Link>
        </div>
      </header>
      <p className="text-lavan">{task.description}</p>
      <p className="text-xs">{new Date(task.date).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
