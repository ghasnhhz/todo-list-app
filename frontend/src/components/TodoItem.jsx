import api from "../api"

export default function TodoItem({ todo, fetchTodos, setEditingTodo }) {
  async function handleEditTodo(todo) {
    setEditingTodo(todo)
  }

  async function handleDeleteTodo(id) {
    try {
      await api.delete(`/todos/${id}`)

      fetchTodos()
    } catch (err) {
      console.error("Error deleting the todo", err)
    }
  }

  return (
    <div className="todo">
      <h3>{todo.title}</h3>
      <div className="edit-delete-buttons">
        <button className="edit-button" onClick={() => handleEditTodo(todo)}>Edit</button>
        <button className="delete-button" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
      </div>
    </div>
  )
}