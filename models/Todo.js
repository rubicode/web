const { db } = require('./connect')

class Todo {

    constructor({ id, title, complete }) {
        this.id = id || null
        this.title = title
        this.complete = complete || false
    }

    save(callback = function () { }) { // prototype method // upsert
        if (this.id) {
            db.run(`UPDATE todos SET title = ? , complete = ? WHERE id = ?`, [this.title, this.complete, this.id], function (err) {
                if (err) return console.log(err)
                callback()
            })
        } else {
            db.run(`INSERT INTO todos (title, complete) VALUES (?, ?)`, [this.title, this.complete], function (err) {
                if (err) return console.log(err)
                callback()
            })
        }
    }

    static create(title = '', complete, callback) {
        if (typeof arguments[1] === 'function') {
            db.run(`INSERT INTO todos (title, complete) VALUES (?, false)`, [title], function (err) {
                if (err) return console.log(err)
                callback()
            })
        } else if (typeof arguments[1] === 'boolean') {
            db.run(`INSERT INTO todos (title, complete) VALUES (?, ?)`, [title, complete], function (err) {
                if (err) return console.log(err)
                callback()
            })
        } else {
            db.run(`INSERT INTO todos (title) VALUES (?)`, [title], function (err) {
                if (err) return console.log(err)
                console.log('callback not define')
            })
        }
    }

    static all(page, title, complete, sortBy, sortMode, callback) {
        // fitur browse
        const queryParams = []
        const params = []
        if (title) {
            queryParams.push(`title like '%' || ? || '%'`)
            params.push(title)
        }

        if (complete) {
            queryParams.push(`complete = ?`)
            params.push(JSON.parse(complete))
        }

        const limit = 3
        const offset = (page - 1) * limit

        let sql = 'SELECT count(*) as total FROM todos'

        if (queryParams.length > 0) {
            sql += ` WHERE ${queryParams.join(' AND ')}`
        }

        db.get(sql, params, function (err, row) {
            const total = row.total
            const pages = Math.ceil(total / limit)

            sql = 'SELECT * FROM todos'
            if (queryParams.length > 0) {
                sql += ` WHERE ${queryParams.join(' AND ')}`
            }
            sql += ` ORDER BY ${['id', 'title', 'complete'].includes(sortBy) ? sortBy : 'id'} ${sortMode == 'asc' ? 'asc' : 'desc'}`
            sql += ' limit ? offset ?'
            params.push(limit, offset)
            console.log('sql', sql, params)
            db.all(sql, params, function (err, rows) {
                if (err) return console.log(err)
                callback({ data: rows, pages, offset })
            })
        })
    }

    static get(id, callback) {
        db.get('SELECT * FROM todos WHERE id = ?', [id], function (err, row) {
            if (err) return console.log(err)
            callback(row)
        })
    }

    static update(id, title, complete, callback) {
        db.run('UPDATE todos SET title = ?, complete = ? WHERE id = ?', [title, complete, id], function (err) {
            if (err) return console.log(err)
            callback()
        })
    }

    static remove(id, callback) {
        db.run('DELETE FROM todos WHERE id=?', [id], function (err) {
            if (err) return console.log(err)
            callback()
        })
    }

}

module.exports = Todo