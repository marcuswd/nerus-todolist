import { useState, useEffect } from "react";
import { Task } from "@/types";
import { TodoController } from "@/controller/todo";
import { toast } from "react-toastify";

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const { data, error } = await TodoController.getTodos();

    if (error) {
      toast.error(error);
      return;
    }

    if (!data) {
      toast.error("No todos found!");
      return;
    }
    
    setTasks(data);
  };

  const addTask = async (content: string) => {
    setLoading(true);
    const { data, error } = await TodoController.addTodo({ content });
    if (error) {
      toast.error(`Error adding task: ${error}`);
      setLoading(false);
      return;
    }

    console.log(data);

    if(data){
      setTasks((prev) => [...prev, data]);
      toast.success("Task added!");
      setLoading(false);
    }

  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    const { error } = await TodoController.deleteTodo(id);
    if (error) {
      toast.error("Error deleting task");
      return;
    }
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted!");
    setLoading(false);
  };

  const toggleTask = async (id: string, completed: boolean) => {
    setLoading(true);
    const { error } = await TodoController.toggleTodo(id, completed);
    if (error) {
      toast.error("Error updating task");
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task updated!");
    setLoading(false);
  };

  const editTask = async (id: string, content: string) => {
    setLoading(true);
    const { error } = await TodoController.editTodo(id, { content });
    if (error) {
      toast.error("Error editing task");
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, content } : task
      )
    );
    toast.success("Task edited!");
    setLoading(false);
  };

  useEffect(() => {
    try {
      fetchTasks().finally(() => {
        setLoading(false);
      });
    } catch (error) {
      if(error instanceof Error) {
        toast.error(`Error fetching tasks: ${error.message}`);
      }
      setLoading(false)
    }
  }, []);

  return {
    tasks,
    loading,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  };
}
