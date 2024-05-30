const { Pool } = require('pg')

const db = new Pool({
    user: 'rubi',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'workdb',
})

db.query("SELECT * FROM todos", function (err, data) { // mode callback
    if (err) return console.log('gagal bro', err)
    console.log('berhasil callback', data.rows)
})

db.query("SELECT * FROM todos").then((data) => { // mode promise
    console.log('berhasil promise', data.rows)
}).catch(err => {
    console.log('gagal bro', err)
})

// mode async await
async function bacaTodos() {
    try {
        const data = await db.query("SELECT * FROM todos")
        console.log('berhasil await', data.rows)
    } catch (err) {
        console.log('gagal bro', err)
    } finally {
        console.log('baca data selesai')
    }

}

bacaTodos()