import { Task } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { TodoBody } from "../models/todo";
import { RepositoryResponse } from "../types/todo";

export const TodosRepository = {
  findAll: async (): Promise<RepositoryResponse<Task[]>> => {
    try {
      const tasks = await prisma.task.findMany();
      if (!tasks || tasks.length === 0) {
        return { data: null, error: "No todos found" };
      }
      return { data: tasks, error: null };
      
    } catch (error) {
      return { data: null, error: "Error fetching todos" };
    }
  },

  findById: async (id: string): Promise<RepositoryResponse<Task>> => {
    
    try {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) {
        return { data: null, error: "Todo not found" };
      }
      return { data: task, error: null };
    } catch (error) {
      if (error instanceof Error) {
        return { data: null, error: `Todo not found ${error.message}` };
      }
      return { data: null, error: "Todo not found" };
    }
  },

  create: async (data: TodoBody): Promise<RepositoryResponse<Task>> => {
    try {
      const newTodo = await prisma.task.create({ data });
      return { data: newTodo, error: null };
    } catch (error) {
      return { data: null, error: `Error creating todo ${error}` };
    }
  },

  delete: async (id: string): Promise<RepositoryResponse<Task>> => {
    try {
      const checkTodo = await prisma.task.findUnique({ where: { id } });
      if (!checkTodo) {
        return { error: "Todo not found", data: null };
      }
  
      const deletedTask = await prisma.task.delete({ where: { id } });
      return { error: null, data: deletedTask };
  
    } catch (error) {
      return { data: null, error: `Error deleting todo: ${(error as Error).message}` };
    }
  },  

  update: async (id: string, data: Partial<TodoBody>): Promise<RepositoryResponse<Task>> => {
    try {
      const updatedTodo = await prisma.task.update({ where: { id }, data });
      return { data: updatedTodo, error: null };
    } catch (error) {
      return { data: null, error: "Error updating todo" };
    }
  }
};
