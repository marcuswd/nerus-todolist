import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const router = Router();

/**
 * Interface representing a Todo item.
 */
interface Todo {

    /**
     * The ID of the Todo item as a string.
     */
    id: string;

    /**
     * Title or description of the Todo item.
     */
    name: string;

    /**
     * Indicates whether the Todo item is completed.
     */
    completed: boolean;
}

/**
 * Interface representing the route parameters for a Todo.
 */
interface TodoParams {
    /**
     * The ID of the Todo item as a string.
     */
    id: string;
}

/**
 * Interface representing the body of a Todo request.
 */
interface TodoBody {
    /**
     * Title or description of the Todo item.
     */
    name: string;
    completed?: boolean;
}

/**
 * GET /todos
 * 
 * Retrieves the list of all Todo items.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A list of Todo items.
 */
router.get("/todos", async (req: Request, res: Response) => {
    const allTodos = await prisma.task.findMany();
    res.send(allTodos);
});

router.post("/todos", async (req: Request<{}, {}, TodoBody>, res: Response) => {
    const newTodo: TodoBody = {
        name: req.body.name
    };

    const todos = await prisma.task.create({
        data: {
            ...newTodo
        }
    });
    res.status(201).send(todos);
});

router.delete("/todos/:id", async (req: Request<TodoParams>, res: Response) => {
    const { id } = req.params;
    const deletedTodo = await prisma.task.delete({
        where: {
            id: String(id)
        }
    });
    const remainingTodos = await prisma.task.findMany();
    res.status(200).send({ deletedTodo, remainingTodos });
});

router.patch("/todos/:id", async (req: Request<TodoParams, {}, TodoBody>, res: Response) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    const updatedTodo = await prisma.task.update({
        where: {
            id: String(id),
        },
        data: {
            name,
            completed: completed
        }
    });
    const remainingTodos = await prisma.task.findMany();
    res.status(200).send({ updatedTodo, remainingTodos });
});

export default router;
