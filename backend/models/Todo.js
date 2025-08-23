const mongoose = require('mongoose')

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  }
})

module.exports = mongoose.model("Todos", todosSchema)