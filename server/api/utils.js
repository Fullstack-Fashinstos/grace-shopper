const User = require('../db/models/user');

const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		const user = await User.findByToken(token);

		if (user.isAdmin) {
			return next();
		}

		const error = new Error(
			'only admins or authorized users can access this route'
		);
		error.status = 401;
		next(error);
	} catch (err) {
		next(err);
	}
};

module.exports = isAdmin;
