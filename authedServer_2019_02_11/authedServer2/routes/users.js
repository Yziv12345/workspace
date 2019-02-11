var express = require("express");
var router = express.Router();
const MD5 = require("md5");
const users = {
  admin: "9a618248b64db62d15b300a07b00580b",
  nisan: "9c42a1346e333a770904b2a2b37fa7d3"
};

const userRoles = {
  admin: "ADMIN",
  nisan: "SUPER_ADMIN"
};

const rolePermissions = {
  ADMIN: ["read", "write", "delete"],
  SUPER_ADMIN: ["read", "write", "delete", "shutdown"]
};

function authorizer(username, password) {
  const currentUserPassword = users[username];
  if (!currentUserPassword) return false;

  if (currentUserPassword !== MD5(password)) {
    return false;
  }

  return userRoles[username] === "SUPER_ADMIN";
}

const basicAuth = require("express-basic-auth");
router.use(basicAuth({ authorizer }));

/* GET users listing. */
router.get("/restricted", function(req, res, next) {
  res.json({ STATUS: "You're in" });
  next();
});

module.exports = router;
