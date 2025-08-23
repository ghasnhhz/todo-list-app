require('dotenv').config({quiet: true})
const express = require('express')
const connectDB = require('./db/connectDB')
const todosRoute = require('./routes/todos')
const app = express()

app.use(express.json())

async function connectDBase() {
  await connectDB()
}
connectDBase()

app.use('/todos', todosRoute)

app.listen(3000, () => {
  console.log("App is listening on: http://localhost:3000")
})