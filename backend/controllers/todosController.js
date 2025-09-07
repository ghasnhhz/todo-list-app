const mongoose = require('mongoose')
const Todos = require('../models/Todo')

async function getTodos(req, res) {
  try {
    const todos = await Todos.find({}, {__v: 0})

    if (todos.length === 0) {
      return res.status(200).json({message: "No todos are added yet"})
    }

    res.status(200).json(todos)
  } catch (err) {
    console.log(err.message)
  }
}

async function addTodos(req, res) {
  try {
    const todos = req.body

    if (!todos.title) {
      return res.status(400).json({message: "No task is provided"})
    }

    const result = await Todos.create(todos)

    res.status(201).json({
      message: "Your new task is added successfully",
      todo: {
        id: result._id,
        title: result.title,
      }
    })
  } catch (err) {
    console.log(err.message)
  }
}

async function editTodo(req, res) {
  try {
    const { id } = req.params
    const {title} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid ID"})
    }

    const result = await Todos.findByIdAndUpdate(
      id,
      { title },
      {new: true},
    )

    res.status(200).json({
      message: "Your task is edited successfully",
      todo: {
        title: result.title
      },
    })
  } catch (err) {
    console.log(err.message)
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid ID"})
    }

    await Todos.findByIdAndDelete(id)

    res.status(200).json({message: "Your task is deleted successfully"})
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {getTodos, addTodos, editTodo, deleteTodo}