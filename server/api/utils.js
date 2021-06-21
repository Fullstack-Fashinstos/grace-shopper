//const User = require('./users')
const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    try {
        //console.log(req.headers, 'in adminAuth')
        if(req.headers.admin === 'true') {
            req.isAdmin = true
            next()
        } else {
            req.isAdmin = false
            next()
        }

    } catch (error) {
        next(err)
    }
}

module.exports = adminAuth