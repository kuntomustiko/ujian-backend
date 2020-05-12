
const conn = require('../config/database/mysql.js')
const router = require('express').Router()
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

/////////////////
// C R E A T E //
////////////////
router.post('/products/create', (req, res) => {
    const sql = `INSERT INTO products SET ?`
    const data = req.body
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err)
        res.send({
            message: 'Insert Product berhasil'
        })

    })
})

const upload = multer({
    limits: {
        fileSize: 10000000 // Byte, default 1mb 
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload image file (jpg, jpeg, or png'))
        }
        cb(undefined, true)
    }
})

const filesDirectory = path.join(__dirname, '../files')

router.post('/products/image', upload.single('avatar'), async (req, res) => {
    try {
        const avatar = `${req.body.name}-avatar.png`
        const sql = `UPDATE products SET image = '${avatar}' WHERE name = '${req.body.name}'`
        await sharp(req.file.buffer).resize(300).png().toFile(`${filesDirectory}/${fileName}`)
        conn.query(sql, (err, result) => {
            if (err) return res.send(err)
            res.send({ message: 'Berhasil di upload' })
        })
    } catch (err) {
        res.send(err.message)
    }
}, (err, req, res, next) => {
    res.send(err)
})

//////////////
// R E A D //
////////////

router.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products'

    conn.query(sql, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send({
            message: "products berhasil di baca",
            products: result
        })
    })
})

// Image
router.get('/products/image/:name', (req, res) => {
    const name = req.params.name
    const sql = `SELECT image FROM products WHERE name = '${name}'`
    conn.query(sql, (err, result) => {
        if (err) return res.send(err)
        try {
            const fileName = result[0].avatar
            const options = {
                root: filesDirectory
            }

            res.sendFile(`${filesDirectory}/${fileName}`, (err) => {
                if (err) return res.send(err)
            })
        } catch (err) {
            res.send(err)
        }
    })
})

/////////////////
// U P D A T E //
////////////////

router.patch('/products/update/:id', (req, res) => {
    const sql = `UPDATE products SET ? WHERE product_id = ? `
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

router.delete('/products/delete/:id', (req, res) => {
    const sql = `DELETE FROM products WHERE product_id = ?`
    const data = req.params.id
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send({
            message: "Products berhasil di delete"
        })
    })
})


module.exports = router