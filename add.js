const { layout } = require('./layout')
const { readFileSync } = require('node:fs')
const html = readFileSync('add.html', 'utf-8')

function drawAdd() {
    return layout('Form Add Todo', html)
}

module.exports = { drawAdd }