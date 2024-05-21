const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const todos = [
    { title: "main futsal", complete: false },
    { title: "coding node", complete: true }
]

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('todos', { todos })
})

app.get('/add', function (req, res) {
    res.render('form', { item: {} })
})

app.post('/add', function (req, res) {
    const title = req.body.title
    const complete = JSON.parse(req.body.complete)
    todos.push({ title, complete })
    res.redirect('/')
})

app.get('/delete/:id', function (req, res) {
    const index = req.params.id
    todos.splice(index, 1)
    res.redirect('/')
})

app.get('/edit/:id', function (req, res) {
    const index = req.params.id
    res.render('form', { item: todos[index] })
})

app.post('/edit/:id', function (req, res) {
    const index = req.params.id
    const title = req.body.title
    const complete = JSON.parse(req.body.complete)
    todos[index] = { title, complete }
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})