import { Router, Request, Response } from "express";
import { TodosService } from "../services/todo";
import { TodoBody, TodoParams } from "../models/todo";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Todos
 *     description: Endpoints de gerenciamento de tarefas
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/todos", async (_req: Request, res: Response) => {
  const allTodos = await TodosService.getAllTodos();
  res.send(allTodos);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.get("/todos/:id", async (req: Request<TodoParams>, res: Response) => {
  const singleTodo = await TodosService.getSingleTodo(req.params.id);
  res.send(singleTodo);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoBody'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post("/todos", async (req: Request<{}, {}, TodoBody>, res: Response) => {
  const newTodo = await TodosService.createTodo(req.body);
  res.status(201).send(newTodo);
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa removida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete("/todos/:id", async (req: Request<TodoParams>, res: Response) => {
  const { id } = req.params;
  const result = await TodosService.deleteTodo(id);
  res.status(200).send(result);
});

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Atualiza uma tarefa
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoBody'
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.patch("/todos/:id", async (req: Request<TodoParams, {}, TodoBody>, res: Response) => {
  const { id } = req.params;
  const result = await TodosService.updateTodo(id, req.body);
  res.status(200).send(result);
});

export default router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: string
 *         completed:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     TodoBody:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *         completed:
 *           type: boolean
 */
