const { layout } = require('./layout')

function drawTodos(data = []) {
    let html = `
    <h1>Todo List</h1>
    <a class="btn" href="/add">Tambah</a>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Complete</th>
            </tr>
        </thead>
        <tbody>
    `
    data.forEach((item, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.complete ? 'Sudah' : 'Belum'}</td>
        </tr>
        `
    })
    html += `        
        </tbody>
    </table>
    `
    return layout('Todo List', html)
}

module.exports = { drawTodos }