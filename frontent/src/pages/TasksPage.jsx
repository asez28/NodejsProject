import React, { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <div className="flex h-screen items-center justify-center">
     <h1>You don't have any Task, maybe you want to create?  <Link to="/add-task" className=" text-cahol1 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create Now</Link> </h1>
    </div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-20">
      {tasks.map((task) => (
       <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
