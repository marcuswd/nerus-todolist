import { Router, Request, Response } from "express";
import { TodosService } from "../services/todo";
import { TodoBody, TodoParams } from "../models/todo";

const router = Router();

router.get("/todos", async (_req: Request, res: Response) => {
  const allTodos = await TodosService.getAllTodos();
  res.send(allTodos);
});

router.get("/todos/:id", async (req: Request<TodoParams>, res: Response) => {
  const singleTodo = await TodosService.getSingleTodo(req.params.id);
  res.send(singleTodo);
});

router.post("/todos", async (req: Request<{}, {}, TodoBody>, res: Response) => {
  const newTodo = await TodosService.createTodo(req.body);
  res.status(201).send(newTodo);
});

router.delete("/todos/:id", async (req: Request<TodoParams>, res: Response) => {
  const { id } = req.params;
  const result = await TodosService.deleteTodo(id);
  res.status(200).send(result);
});

router.patch("/todos/:id", async (req: Request<TodoParams, {}, TodoBody>, res: Response) => {
  const { id } = req.params;
  const result = await TodosService.updateTodo(id, req.body);
  res.status(200).send(result);
});

export default router;