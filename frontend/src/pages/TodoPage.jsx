import "../styles.css"
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList"; 
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

function TodoPage() {
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)

  const {logout} = useAuth()

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
  }, [])
  
  async function handleLogout() {
    try {
      await logout()
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: "30px", paddingRight: '30px'}}>
        <h1>Todo App</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <TodoForm fetchTodos={fetchTodos} editingTodo={editingTodo} setEditingTodo={setEditingTodo}/>
      <TodoList todos={todos} fetchTodos={fetchTodos} setEditingTodo={setEditingTodo}/>
    </div>
  )
}

export default TodoPage;
