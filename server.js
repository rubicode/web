const http = require('http')
const { layout } = require('./layout')
const { drawTodos } = require('./todos')
const { drawAdd } = require('./add')

const todos = [
    { title: "main futsal", complete: false },
    { title: "coding node", complete: true }
]

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    if (req.url == '/') {
        res.end(drawTodos(todos))
    } else if (req.url == '/add') {
        if (req.method === 'POST') {
            let body = ''
            req.on('data', function (chunk) {
                body += chunk;
            })
            req.on('end', function () {
                console.log(body)
                const params = new URLSearchParams(body)
                const title = params.get('title')
                const complete = JSON.parse(params.get('complete'))
                todos.push({title, complete})
                res.writeHead(301, {location: 'http://localhost:3000/'}).end() // redirect ke todo list
            })
        } else {
            res.end(drawAdd())
        }
    } else {
        res.end(layout('Not Found', '<h1>mau kemana hayo 404</h1>'))
    }
}).listen(3000) // port