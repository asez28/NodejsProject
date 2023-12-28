import { useForm } from "react-hook-form";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Title" {...register("title")} autoFocus />
        <textarea rows="3" placeholder="Description" {...register("description")} />
        <button>Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
