const express = require('express');
const ExpressError = require('./ExpressError');
const app = express();
const routes = require('./routes')

app.use(express.json());
app.use("/items", routes)

//404 Handler
app.use((req, res) => {
    throw new ExpressError("Page not found", 404)
})

// generic error handler
app.use((error, req, res, next) => {
    return res.status(error.status).json({ message: error.message });
  });

module.exports = app;