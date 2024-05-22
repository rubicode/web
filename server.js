const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { db } = require('./connect')

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    db.all('SELECT * FROM todos', function (err, rows) {
        if (err) return console.log(err)
        res.render('todos', { todos: rows })
    })
})

app.get('/add', function (req, res) {
    res.render('form', { item: {} })
})

app.post('/add', function (req, res) {
    const title = req.body.title
    const complete = JSON.parse(req.body.complete)
    db.run(`INSERT INTO todos (title, complete) VALUES (?, ?)`, [title, complete], function (err) {
        if (err) return console.log(err)
        res.redirect('/')
    })
})

app.get('/delete/:id', function (req, res) {
    const id = req.params.id
    db.run('DELETE FROM todos WHERE id=?', [id], function(err){
        res.redirect('/')
    })
})

app.get('/edit/:id', function (req, res) {
    const id = Number(req.params.id)
    db.get('SELECT * FROM todos WHERE id = ?', [id], function(err, row){
        if (err) return console.log(err)
        res.render('form', { item: row })
    })
})

app.post('/edit/:id', function (req, res) {
    const id = Number(req.params.id)
    const title = req.body.title
    const complete = JSON.parse(req.body.complete)
    db.run('UPDATE todos SET title = ?, complete = ? WHERE id = ?', [title, complete, id], function(err){
        if (err) return console.log(err)
        res.redirect('/')
    })
})

app.listen(3000, function () {
    console.log('server berjalan di port 3000')
})