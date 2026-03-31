require('dotenv').config({quiet: true})
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connectDB')
const todosRoute = require('./routes/todos')
const auth = require('./routes/auth')
const errorHandler = require('./middlewares/errorHandler')
const authenticateToken = require('./middlewares/authMiddleware')
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(cookieParser())

async function connectDBase() {
  await connectDB()
}
connectDBase()

app.use('/todos', authenticateToken, todosRoute)
app.use('/auth', auth)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log("App is listening on: http://localhost:3000")
})