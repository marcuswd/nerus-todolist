export interface Todo {
    id: string;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TodoBody {
    content: string;
    completed?: boolean;
}

export interface TodoParams {
    id: string;
}
