//const User = require('./users')
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    next()
}

const adminHeaderAuth = async (req, res, next) => {
    if(req.headers.admin === 'true') {
        next()
    } else {
        const error = new Error('unauth')
        error.status = 403
        throw error
    }
}


const adminAuth = async (req, res, next) => {
    try {
        console.log(req.headers, 'in adminAuth')
        if(req.body.isAdmin) {
            next()
        }
        if(req.body.user.isAdmin) {
            next()
        } else {
            const error = new Error('unauth')
            error.status = 403
            throw error

        }

    } catch (error) {
        next(error)
    }
}

module.exports = {adminAuth, userAuth, adminHeaderAuth}
