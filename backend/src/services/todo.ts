import { TodosRepository } from "../repositories/todo";
import { TodoBody } from "../models/todo";

export const TodosService = {
  getAllTodos: () => TodosRepository.findAll(),

  getSingleTodo: async (id: string) => {
    const allTodos = await TodosRepository.findAll();
    const foundTodo = allTodos.find((t) => t.id === id);
    if (!foundTodo) {
      throw new Error("Todo not found");
    }
    return foundTodo;
  },


  createTodo: (data: TodoBody) => TodosRepository.create(data),

  deleteTodo: async (id: string) => {
    const deletedTodo = await TodosRepository.delete(id);
    const remainingTodos = await TodosRepository.findAll();
    return { deletedTodo, remainingTodos };
  },

  updateTodo: async (id: string, data: Partial<TodoBody>) => {
    const updatedTodo = await TodosRepository.update(id, data);
    const remainingTodos = await TodosRepository.findAll();
    return { updatedTodo, remainingTodos };
  },
};
