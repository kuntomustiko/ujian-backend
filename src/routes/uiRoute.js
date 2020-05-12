
const conn = require('../config/database/mysql.js')
const router = require('express').Router()

//////////////
// R E A D //
////////////

router.get('/uiroute', (req, res) => {
    const sql = 'select p.name, s.branch_name, i.inventory from products p join inventory i ON p.product_id = i.product_id join store s ON s.store_id = i.store_id; '

    conn.query(sql, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send({
            message: "ui route berhasil di baca",
            uiroute: result
        })
    })
})


/////////////////
// T O M B O L - E D I T //
////////////////

router.patch('/uiroute/:id', (req, res) => {
    const sql = `const sql = UPDATE inventory SET ? WHERE inventory_id = ?`
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

router.delete('/uiroute/:id', (req, res) => {
    const sql = `DELETE FROM inventory WHERE inventory_id = ?`
    const data = req.params.id
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send({
            message: "store berhasil di delete"
        })


    })
})




module.exports = router