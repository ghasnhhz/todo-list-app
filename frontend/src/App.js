// Your current App.js with just the replace prop added:
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";

function AppRoutes() {
  const { isLoggedIn, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/todos" replace /> : <Navigate to="/login" replace />}
      />
      <Route 
        path="/login" 
        element={isLoggedIn ? <Navigate to="/todos" replace /> : <LoginPage />}
      />
      <Route 
        path="/register" 
        element={isLoggedIn ? <Navigate to="/todos" replace /> : <RegisterPage />}
      />
      <Route 
        path="/todos" 
        element={isLoggedIn ? <TodoPage /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App;