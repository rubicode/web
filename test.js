const Todo = require('./models/Todo')
Todo.remove(6, function(){
    Todo.all(function (data) {
        console.log(data)
    })
})
