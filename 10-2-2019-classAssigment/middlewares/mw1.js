const User = require("../entities/user");


function timeStampMW(req, res, next) {
    req.timestamp1 = Date.now();
    const currentUser = new User({req});
    req.currentUser = currentUser;
    setTimeout(next, 1 * 1000);
  }
  
  module.exports = timeStampMW;
  