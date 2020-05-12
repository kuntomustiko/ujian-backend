
const conn = require('../config/database/mysql.js')
const router = require('express').Router()
/////////////////
// C R E A T E //
////////////////
router.post('/store/create', (req, res) => {
    const sql = `INSERT INTO store SET ?`
    const data = req.body
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err)
        res.send({
            message: 'Insert store berhasil'
        })
    })
})

//////////////
// R E A D //
////////////

router.get('/store/read', (req, res) => {
    const sql = 'SELECT * FROM store'

    conn.query(sql, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send({
            message: "Store berhasil di baca",
            store: result
        })
    })
})

/////////////////
// U P D A T E //
////////////////

router.patch('/store/update/:id', (req, res) => {
    const sql = `UPDATE store SET ? WHERE store_id = ? `
    const data = [req.body, req.params.id]
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err)
        res.send({
            message: "Update berhasil",
            result
        })
    })
})

//////////////////
// D E L E T E //
////////////////

router.delete('/store/delete/:id', (req, res) => {
    const sql = `DELETE FROM store WHERE store_id = ?`
    const data = req.params.id
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send({
            message: "store berhasil di delete"
        })
    })
})


module.exports = router