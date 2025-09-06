import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!username || !password) {
      console.log("Please fill in all fields")
    }
    
    try {
      await register(username, password)
      navigate('/todos')
    } catch (err) {
      console.error("Error while registering:", err)
    }
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>

      <p>
        Already have account?
        <Link to="/login">Login here</Link>
      </p>
    </div>
  )
}