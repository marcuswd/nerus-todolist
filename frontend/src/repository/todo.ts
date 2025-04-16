async function getTodos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function addTodo(todo: { content: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function toggleTodo(id:string, completed: boolean) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: !completed }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function deleteTodo(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function editTodo(id: string, todo: { content: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const TodoRepository = {
  getTodos,
  toggleTodo,
  addTodo,
  deleteTodo,
  editTodo
}