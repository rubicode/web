const Todo = require('../models/Todo')

function getTodos(req, res) {
    const url = req.url === '/' ? '/?page=1&sortBy=id&sortMode=asc' : req.url
    const page = req.query.page || 1

    // sorting
    const sortBy = req.query.sortBy || 'id'
    const sortMode = req.query.sortMode || 'asc'

    // searching
    const title = req.query.title
    const complete = req.query.complete
    Todo.all(page, title, complete, sortBy, sortMode, function ({ data, pages, offset }) {
        res.render('todos', { todos: data, page, pages, offset, url, query: req.query, sortMode, sortBy })
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