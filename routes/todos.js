var express = require('express');
var router = express.Router();

const { getTodos, addTodo, createTodo, deleteTodo, editTodo, updateTodo } = require('../controllers/TodosController')

/* GET users listing. */
// read, browse, sort, pagination
router.get('/', getTodos)
// add
router.get('/add', addTodo)

router.post('/add', createTodo)
// delete
router.get('/delete/:id', deleteTodo)
// edit
router.get('/edit/:id', editTodo)

router.post('/edit/:id', updateTodo)

module.exports = router;