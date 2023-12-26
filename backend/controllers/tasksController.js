import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks);
};

export const createTask = async (req, res) => {
  if (!["Pro"].includes(req.user.rol)) {
    return res
      .status(403)
      .json({
        message: "you dont have permision to create task, update to PRO",
      });
  }

  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  if (!["Pro"].includes(req.user.rol)) {
    return res
      .status(403)
      .json({ message: "you don have permision to update this task" });
  }

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  if (!["Pro"].includes(req.user.rol)) {
    return res
      .status(403)
      .json({ message: "you dont have permission to delete this task" });
  }

  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
};
