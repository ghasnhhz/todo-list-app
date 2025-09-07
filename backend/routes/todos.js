const express = require('express')
const {getTodos, addTodos, editTodo, deleteTodo} =require('../controllers/todosController')
const router = express.Router()

router.get('/', getTodos)
router.post('/', addTodos)
router.put('/:id', editTodo)
router.delete('/:id', deleteTodo)

module.exports = router