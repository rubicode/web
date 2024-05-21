const { readFileSync } = require('node:fs')
const html = readFileSync('index.html', 'utf-8')

function layout(title, content) {
    return html.replace('#title#', title).replace('#content#', content)
}

module.exports = { layout }