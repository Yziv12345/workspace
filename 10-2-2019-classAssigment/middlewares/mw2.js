const User = require("../entities/user");


function authMw(req, res, next) {
  req.timestamp2 = Date.now();

  const currentUser = 
  req.currentUser = currentUser;
  setTimeout(next, 1 * 1000);
}

module.exports = authMw;
