import { TodoRepository } from "@/repository/todo"
import { Task } from "@/types";

interface ControllerGetTodosParams{
  data: Task[] | null
  error: string | null
}

export async function getTodos() : Promise<ControllerGetTodosParams> {
  try {
    const response = await TodoRepository.getTodos();
    const todos = await response;
    const { data, error } = todos;
    if (error) {
      return { data: null, error: error || "Unknown error" };
    }
    
    return { data, error: null };
  } catch (error : unknown) {

    if(error instanceof Error) {
      return { data: null, error: error.message || "Unknown error" };
    }
    else {
      return { data: null, error: "Error fetching todos" };
    }
  }
}

interface ControllerAddTodoParams{
  data: Task | null
  error: string | null
}

export async function addTodo(todo: { content: string }) : Promise<ControllerAddTodoParams> {
  try {
    const response = await TodoRepository.addTodo(todo);
    const { data, error } = response;
    if (error) {
      return { data: null, error: error.message || "Unknown error" };
    }

    return { data, error: null };
  } catch (error) {
    if(error instanceof Error) {
      return { data: null, error: error.message || "Unknown error" };
    }
    else {
      return { data: null, error: "Error adding todo" };
    }
  }
}

export async function toggleTodo(id:string, completed: boolean) {
  try {
    const response = await TodoRepository.toggleTodo(id, completed);
    return { data: response, error: null };
  } catch (error) {
    if(error instanceof Error) {
      return { data: null, error: error.message || "Unknown error" };
    }
    else {
      return { data: null, error: "Error toggling todo" };
    }
  }
}

export async function deleteTodo(id: string) {
  try {
    const response = await TodoRepository.deleteTodo(id);
    return { data: response, error: null };
  }
  catch (error) {
    if(error instanceof Error) {
      return { data: null, error: error.message || "Unknown error" };
    }
    else {
      return { data: null, error: "Error deleting todo" };
    }
  }
}

export async function editTodo(id: string, todo: { content: string }) {
  try {
    const response = await TodoRepository.editTodo(id, todo);
    return { data: response, error: null };
  } catch (error) {
    if(error instanceof Error) {
      return { data: null, error: error.message || "Unknown error" };
    }
    else {
      return { data: null, error: "Error editing todo" };
    }
  }
}

export const TodoController = {
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo
} 