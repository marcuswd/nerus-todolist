import { prisma } from "../lib/prisma";
import { TodoBody } from "../models/todo";

export const TodosRepository = {
  findAll: () => prisma.task.findMany(),

  create: (data: TodoBody) =>
    prisma.task.create({ data }),

  delete: (id: string) =>
    prisma.task.delete({ where: { id } }),

  update: (id: string, data: Partial<TodoBody>) =>
    prisma.task.update({ where: { id }, data }),
};
