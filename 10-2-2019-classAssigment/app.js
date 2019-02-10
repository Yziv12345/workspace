const express = require('express')
const 


const mw1 = require("./middlewares/mw1");
const mw2 = require("./middlewares/mw2");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");



var app = express();
app.listen(3000);

// Custom middlewaeres
app.use(mw2);
app.use(mw1);

// Routing
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;