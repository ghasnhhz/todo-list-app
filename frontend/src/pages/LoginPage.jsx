import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {login, isLoggedIn} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/todos')
    }
  }) 

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      await login(username, password)
      navigate('/todos')
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account yet? 
        <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

