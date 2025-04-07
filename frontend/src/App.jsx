import AddItem from "./Components/AddItem";
import List from "./Components/List";
import { useState, useEffect, use } from "react";
import { Routes, Route, data } from "react-router-dom";
import React from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { createTask, getAllTasks, deleteTask, togalTask } from "./api";

const App = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState();

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasks();
      setItems(tasks.data || []);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (input.trim() === "") return;

    const newTask = { id: Date.now(), text: input, completed: false };

    try {
      const data = await createTask(newTask);
      setItems([...items, newTask]);
      setInput("");
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteTask(id);

      setItems(
        items.filter((item) => {
          item.id !== id;
        })
      );
      fetchTasks();
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleCheck = async (id) => {
    fetchTasks();
    const data = await togalTask(id, !completed);
    fetchTasks();
    try {
      setItems(
        items.map(async (item) => {
          item._id === id ? { ...item, completed: !item.completed } : item;
          setCompleted(!item.completed);
          return item;
        })
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const itemToEdit = items.find((item) => item._id === id);
      if (itemToEdit) {
        setInput(itemToEdit.text);
        setItems(items.filter((item) => item._id !== id));
        await handleDelete(id);
      }
    } catch (error) {
      toast.error("Failed to edit task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Toaster
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        React To-Do
      </h2>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <Routes>
          <Route
            path="/"
            element={
              <AddItem input={input} setInput={setInput} addTask={addTask} />
            }
          />
        </Routes>
        <List
          items={items}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
