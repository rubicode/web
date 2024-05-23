const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { getTodos, addTodo, createTodo, deleteTodo, editTodo, updateTodo } = require('./controllers/TodosController')

// synchronous web
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')))

// read, browse, sort, pagination
app.get('/', getTodos)
// add
app.get('/add', addTodo)

app.post('/add', createTodo)
// delete
app.get('/delete/:id', deleteTodo)
// edit
app.get('/edit/:id', editTodo)

app.post('/edit/:id', updateTodo)

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})