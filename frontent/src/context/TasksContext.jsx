import { useContext, createContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  return context;
};

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      throw new Error("Failed to fetch tasks");
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw new Error("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);

      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
