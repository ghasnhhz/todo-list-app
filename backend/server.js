const express = require('express')
const todosRoute = require('./routes/todos')
const app = express()

app.use('/todos', todosRoute)

app.listen(3000, () => {
  console.log("App is listening on: http://localhost:3000")
})