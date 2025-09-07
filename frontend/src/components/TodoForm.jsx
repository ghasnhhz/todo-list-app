import '../styles.css'
import api from '../api'
import { useEffect, useState } from 'react'

export default function TodoForm({ fetchTodos, editingTodo, setEditingTodo }) {
  const [text, setText] = useState("")

  useEffect(() => {
    setText(editingTodo ? editingTodo.title : "")
  }, [editingTodo])
  
  async function handleSubmit(e) {
    if (!text.trim()) return
    e.preventDefault()
    
    try {
      if (editingTodo) {
        await api.put(`/todos/${editingTodo._id}`, { title: text })
        setEditingTodo("")
      } else {
        await api.post("/todos", { title: text })
      }
      
      setText("")
      fetchTodos()
    } catch (err) {
      console.error("Error adding todos:", err)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your task here" className="inputField"
      />
      <button type='submit' className='addButton'>{editingTodo ? 'Edit' : 'Add'}</button>
    </form>
  )
}