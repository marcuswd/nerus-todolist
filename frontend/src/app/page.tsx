'use client';
import Image from "next/image";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const {
    tasks,
    loading,
    addTask,
    deleteTask,
    toggleTask,
    editTask
  } = useTodos();

  const [newTask, setNewTask] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [taskEdit, setTaskEdit] = useState("");

  const handleNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.length > 3) {
      addTask(newTask);
      setNewTask("");
    }
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTaskTitle.length > 3 && taskEdit) {
      editTask(taskEdit, editTaskTitle);
      setTaskEdit("");
    }
  };

  const filterTasks = (filter: string) => {
    setFilter(filter);
  };

  const getFilteredTasks = useCallback(()=> {
    if (!tasks || !Array.isArray(tasks)) return [];
    
    switch (filter) {
      case "active":
        return tasks.filter(task => !task.completed) || [];
      case "completed":
        return tasks.filter(task => task.completed) || [];
      default:
        return tasks || [];
    }
  }, [tasks, filter]);

  useEffect(() => {
    setEditTaskTitle(tasks.find(task => task.id === taskEdit)?.content || "");
  }, [taskEdit, tasks]);

  return (
    <main>
      <ToastContainer />
      <header className="bg-gradient-to-br from-[#7e1366] to-[#b21e28]">
        <div className="container w-11/12 md:w-8/12 xl:w-6/12 mx-auto flex justify-between items-center pt-10 md:pb-15 pb-20">
          <h2 className="font-semibold text-4xl relative inline-block text-white"><span className="font-bold">Nérus</span> Todo List</h2>
        </div>
      </header>
      <section className="container w-11/12 md:w-8/12 xl:w-6/12 mx-auto -mt-10 bg-white rounded-t-lg shadow-lg p-4 pt-0.5 pb-8 mb-3">
        <form onSubmit={handleNewTask} className="grid grid-cols-1 lg:grid-cols-[1fr_150px] gap-4 align-bottom mt-4">
          <fieldset>
            <legend className="text-gray-500 text-2xl mb-2">Add a new task</legend>
              <label className="sr-only" htmlFor="new-task">Add a new task</label>
              <input
                type="text"
                placeholder="Entry a new task"
                className="border border-gray-300 rounded p-2 w-full"
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
              />
          </fieldset>
          <button className="bg-[#1586bf] hover:bg-[#2167be] flex items-center text-center justify-center text-white rounded p-2 mt-auto disabled:bg-gray-200 disabled:text-gray-400 gap-2" disabled={newTask.length <= 3} ><PlusIcon className="size-6" /> Add Task</button>
        </form>
        {newTask.length != 0 && newTask.length < 4 &&
          <p className={`text-red-500 text-sm mt-2`}>Minimum 4 characters</p>
        }
      </section>

      {tasks.length > 0 &&
        <section className="flex justify-between items-center my-6 container w-11/12 md:w-8/12 xl:w-6/12 mx-auto">
          <p>Showing {getFilteredTasks().length} tasks of {tasks.length}</p>
          <div className="flex gap-4">
            <button onClick={() => filterTasks("all")} className={`font-semibold hover:text-[#7e1366] ${filter === "all" ? "text-[#7e1366]" : "text-neutral-700"}`}>All</button>
            <button onClick={() => filterTasks("active") } className={`font-semibold hover:text-[#7e1366] ${filter === "active" ? "text-[#7e1366]" : "text-neutral-700"}`}>Active</button>
            <button onClick={() => filterTasks("completed") } className={`font-semibold hover:text-[#7e1366] ${filter === "completed" ? "text-[#7e1366]" : "text-neutral-700"}`}>Completed</button>
          </div>
        </section>
      }

      <section className="list-container container w-11/12 md:w-8/12 min-h-24 xl:w-6/12 mt-3 mx-auto flex gap-4 flex-col relative">
        {loading && <div className="absolute top-0 left-0 w-full h-full flex items-center gap-3 bg-white/75 justify-center"><Image src={"loading.svg"} width={32} height={16} alt="" />Loading...</div>}
        {tasks.length === 0 && <p className="text-gray-500 mt-3">No tasks available.</p>}
        {(getFilteredTasks().length === 0 && tasks.length  > 0) && <p>No tasks {filter} available</p>}
        {getFilteredTasks().map((task) => (
          <div className="flex justify-between gap-4" key={task.id}>
            <div className="flex gap-4 items-center w-full">

              {taskEdit === task.id ? 
              <form className="flex w-full gap-4 items-center justify-between" onSubmit={handleEditTask}>
                <input type="text" className="border border-gray-300 rounded p-2 w-full" value={editTaskTitle} onChange={(target) => setEditTaskTitle(target.currentTarget.value)} />
                <button className="bg-green-600 hover:bg-green-800 disabled:bg-gray-200 disabled:text-gray-400 text-md text-white rounded p-2 flex justify-around gap-2" disabled={editTaskTitle.length < 3}><CheckIcon className="size-6" /> Salvar</button>
                <button className="bg-[#b21e28] hover:bg-[#93232B] text-white p-2 flex justify-around gap-2" onClick={() => setTaskEdit("")}>
                  <XMarkIcon className="size-6" /> Cancelar
                </button>
              </form> : 
              <>
                <input
                  id={task.id}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, task.completed)}
                />
                <label htmlFor={task.id} className={`text-md ${task.completed ? "line-through" : ""}`}>{task.content}</label>
              </>}
              
            </div>
            {taskEdit != task.id && 
            <>
            <div className="actions flex gap-4">
              <button className="bg-[#1586bf] hover:bg-[#2167be] text-md text-white rounded p-2 flex items-center gap-2 disabled:bg-gray-200 disabled:text-gray-400" onClick={() => setTaskEdit(task.id)} disabled={task.completed}><PencilIcon className="size-4" /> Edit</button>
              <button className="bg-[#b21e28] hover:bg-[#93232B] text-md text-white rounded p-2 flex items-center gap-2" onClick={() => deleteTask(task.id)}><TrashIcon className="size-4" /> Delete</button>
            </div>
            </>}
          </div>
        ))}
      </section>
    </main>
  );
}
