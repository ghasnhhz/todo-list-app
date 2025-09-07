import '../styles.css'
import TodoItem from "./TodoItem";

export default function TodoList({ todos, fetchTodos, setEditingTodo }) {
  try {
    if (todos.length === 0) {
      return <></>
    }
  
    return (
      <>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} setEditingTodo={setEditingTodo}/>
        ))}
      </>
    )
  } catch (err) {
    console.error(err)
  }
}