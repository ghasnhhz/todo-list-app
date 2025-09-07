require('dotenv').config({quiet: true})
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connectDB')
const todosRoute = require('./routes/todos')
const app = express()

app.use(express.json())
app.use(cors())

async function connectDBase() {
  await connectDB()
}
connectDBase()

app.use('/todos', todosRoute)

app.listen(5000, () => {
  console.log("App is listening on: http://localhost:5000")
})