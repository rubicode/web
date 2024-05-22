const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getTodos, addTodo, createTodo, deleteTodo, editTodo, updateTodo } = require('./controllers/TodosController')


app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', getTodos)

app.get('/add', addTodo)

app.post('/add', createTodo)

app.get('/delete/:id', deleteTodo)

app.get('/edit/:id', editTodo)

app.post('/edit/:id', updateTodo)

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})