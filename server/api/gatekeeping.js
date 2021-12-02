const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    // console.log("body-----",req.body)
    // console.log("headers-----", req.headers)
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
