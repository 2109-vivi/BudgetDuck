const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = await User.findByToken(token);
    req.body.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
};
