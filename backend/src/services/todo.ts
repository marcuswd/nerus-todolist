import { TodosRepository } from "../repositories/todo";
import { TodoBody } from "../models/todo";

export const TodosService = {
  getAllTodos: () => TodosRepository.findAll(),

  getSingleTodo: async (id: string) => {
    const todo = await TodosRepository.findById(id);

    if(todo.error){
      return {error : todo.error};
    }

    if (!todo.data) {
      return { error: "No todos found" };
    }

    return { error: null, data: todo.data };
  },

  createTodo: async (data: TodoBody) => {
    if(data.content.length < 4) {
      return {error : "Content must be at least 4 characters long"};
    }
    return TodosRepository.create(data)
  },

  deleteTodo: async (id: string) => {
    const checkTodo = await TodosRepository.findById(id);

    if (checkTodo?.error) {
      return { error: checkTodo.error };
    }

    if (!checkTodo || !checkTodo.data) {
      return { error: "Todo not found" };
    }

    return await TodosRepository.delete(id);
  },

  updateTodo: async (id: string, body: Partial<TodoBody>) => {
    if (body.content && body.content.length < 4) {
      return { error: "Content must be at least 4 characters long" };
    }

    const checkTodo = await TodosRepository.findById(id);

    if (checkTodo?.error) {
      return { error: checkTodo.error };
    }

    if (!checkTodo || !checkTodo.data) {
      return { error: "Todo not found" };
    }

    const data = await TodosRepository.update(id, body);
    return { error: null, data };
  },
};
