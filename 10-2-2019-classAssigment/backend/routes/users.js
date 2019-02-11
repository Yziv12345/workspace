var express = require("express");
var router = express.Router();
const db = require("./db");

router.get('/id', function (req, res) {
  res.send('GET request to the homepage')
})




module.exports = router;