const Todo = require('../models/Todo')

function getTodos(req, res) {
    Todo.all(function (todos) {
        res.render('todos', { todos })
    })
}

function addTodo(req, res) {
    res.render('form', { item: {} })
}

function createTodo(req, res) {
    const title = req.body.title
    const complete = JSON.parse(req.body.complete)
    Todo.create(title, complete, function () {
        res.redirect('/')
    })
}

function deleteTodo(req, res) {
    const id = req.params.id
    Todo.remove(id, function () {
        res.redirect('/')
    })
}

function editTodo(req, res) {
    const id = Number(req.params.id)
    Todo.get(id, function (item) {
        res.render('form', { item })
    })
}

function updateTodo(req, res) {
    const id = Number(req.params.id)
    const title = req.body.title
    const complete = JSON.parse(req.body.complete)
    Todo.update(id, title, complete, function () {
        res.redirect('/')
    })
}

module.exports = { getTodos, addTodo, createTodo, deleteTodo, editTodo, updateTodo }