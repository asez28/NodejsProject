import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
    navigate('/tasks')
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-shahor2 max-w-md w-full p-10 rounded-md">
        <h1 className="my-2">Create yout Task🫡</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-full bg-shahor text-white px-4 py-2 rounded-md my-2"
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-shahor text-white px-4 py-2 rounded-md my-2"
          />
          <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
