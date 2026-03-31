import "./styles.css"
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList"; 
import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)

  async function fetchTodos() {
    try {
      const res = await api.get("/todos")
      setTodos(res.data)
    } catch (err) {
      console.error("Error fetching todos", err)
    }
  }

  useEffect(() => {
    fetchTodos()
  },[])

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm fetchTodos={fetchTodos} editingTodo={editingTodo} setEditingTodo={setEditingTodo}/>
      <TodoList todos={todos} fetchTodos={fetchTodos} setEditingTodo={setEditingTodo}/>
    </div>
  )
}

export default App;
