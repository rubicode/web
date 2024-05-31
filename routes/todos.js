var express = require('express');
const { isLoggedIn } = require('../helpers/util');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

module.exports = function (db) {

    const Todo = db.collection('todos');
    // read browse sort pagination
    router.get('/', isLoggedIn, async (req, res) => {
        try {
            const url = req.url === '/' ? '/?page=1&sortBy=_id&sortMode=asc' : req.url
            const { page = 1, sortBy = '_id', sortMode = 'asc' } = req.query
            const limit = 3
            const offset = (page - 1) * limit
            const total = await Todo.count({executor: new ObjectId(req.session.user._id)})
            const pages = Math.ceil(total / limit)
            const todos = await Todo.find({executor: new ObjectId(req.session.user._id)}).limit(limit).skip(offset).toArray();
            res.render('todos/view', {
                todos,
                query: req.query,
                offset,
                pages,
                page,
                url,
                sortBy,
                sortMode,
                user: req.session.user
            })
        } catch (e) {
            res.send('gagal ambil data', e)
        }
    })
    // add
    router.get('/add', isLoggedIn, (req, res) => {
        res.render('todos/form', { item: {} })
    })
    // save add
    router.post('/add', isLoggedIn, async (req, res) => {
        try {
            const { title, complete = "false" } = req.body
            const todo = await Todo.insertOne({ title, complete: JSON.parse(complete), executor: new ObjectId(req.session.user._id) })
            res.redirect('/todos')
        } catch (e) {
            res.send('gagal tambah data', e)
        }
    })
    // delete
    router.get('/delete/:_id', isLoggedIn, async (req, res) => {
        try {
            const { _id } = req.params
            const todo = await Todo.deleteOne({ _id: new ObjectId(_id) });
            res.redirect('/todos')
        } catch (e) {
            res.send('gagal delete data', e)
        }
    })
    // edit
    router.get('/edit/:_id', isLoggedIn, async (req, res) => {
        try {
            const { _id } = req.params
            const todo = await Todo.findOne({ _id: new ObjectId(_id) })
            res.render('todos/form', { item: todo })
        } catch (e) {
            res.send('gagal ambil data edit', e)
        }
    })
    // update edit
    router.post('/edit/:_id', isLoggedIn, async (req, res) => {
        try {
            const { _id } = req.params
            const { title, complete = "false" } = req.body
            const todo = await Todo.updateOne({ _id: new ObjectId(_id) }, { $set: { title, complete: JSON.parse(complete) } });
            res.redirect('/todos')
        } catch (e) {
            res.send('gagal update data', e)
        }
    })

    return router;
}