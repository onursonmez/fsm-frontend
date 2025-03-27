import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getTodos, deleteTodo } from "../services/api";
import { Todo } from "../types";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      toast.error("Failed to load todos.");
    }
  };

  const todoCreate = () => {
    navigate("/create");
  };

  const todoEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const todoDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      toast.error("Failed to delete!");
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-80 bg-gray-100 shadow-lg border-r border-r-gray-200 p-4">
        <button className="bg-black text-white w-full p-2 rounded-lg shadow-md font-bold mb-2" onClick={todoCreate}>
          + Task Oluştur
        </button>
        {todos.map((todo: Todo) => (
          <div className="flex justify-between" key={todo.id}>
            <div className="mb-1 text-lg cursor-pointer" onClick={() => todoEdit(todo.id)}>
              {todo.title}
            </div>
            <div
              className="cursor-pointer bg-red-700 text-white p-1 rounded-md text-center text-xs w-6 h-6"
              onClick={() => todoDelete(todo.id)}
            >
              X
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
};

export default Dashboard;
