const User = require('../db/models/user')




const isAdmin = async (req, res, next) => {
    //console.log('hit')
    //console.log(req.headers, 'headers')
    try {
        const token = req.headers.authorization;
        console.log(token)
        const user = await User.findByToken(token);
        console.log(user, 'is admin')
        if(user.isAdmin) {
            //console.log('hit')
            next()
        } else {
            //console.log('in else')
            const error = new Error('unauthurized')
            error.status = 401
            next(error)
        }
        
      } catch(error) {
          //console.log('catch')
        next(error);
      }
}

// const userAuth = async (req, res, next) => {
//     next()
// }

// const adminHeaderAuth = async (req, res, next) => {
//     if(req.headers.admin === 'true') {
//         next()
//     } else {
//         const error = new Error('unauth')
//         error.status = 403
//         throw error
//     }
// }


// const adminAuth = async (req, res, next) => {
//     try {
//         console.log(req.headers, 'in adminAuth')
//         if(req.body.isAdmin) {
//             next()
//         } 
//         if(req.body.user.isAdmin) {
//             next()
//         } else {
//             const error = new Error('unauth')
//             error.status = 403
//             throw error
           
//         }

//     } catch (error) {
//         next(error)
//     }
// }

module.exports = isAdmin