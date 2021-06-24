const User = require("../db/models/user");

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const currentUser = await User.findByToken(token);
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error("no token found!");
      error.status = 403;
      return next(error);
    }

    const user = await User.findByToken(token);

    if (user.isAdmin) {
      console.log("admin user authenticated");
      return next();
    }

    const error = new Error(
      "only admins or authorized users can access this route"
    );
    error.status = 401;
    next(error);
  } catch (err) {
    next(err);
  }
};

module.exports = { isUser, isAdmin };
