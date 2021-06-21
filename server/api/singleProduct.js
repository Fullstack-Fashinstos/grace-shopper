const router = require('express').Router({mergeParams: true})
const { models: { Product }} = require('../db')
const adminAuth = require('./utils')
module.exports = router


router.get('/', adminAuth, async (req, res, next) => {
    try {
        //console.log(req.headers.isAdmin, 'in route')
        const product = await Product.findByPk(req.params.productId)
        res.status(200).send(product)
    } catch (error) {
        next(error)
    }
})

router.put('/', async (req, res, next) =>  {
    console.log(req.body)
    try {
        const product = await Product.findByPk(req.params.productId)
        res.status(204).send(await product.update(req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId)
        await product.destroy()
        res.status(202).send(product)
    } catch (error) {
        next(error)
    }
})


