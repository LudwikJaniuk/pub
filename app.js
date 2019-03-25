var express = require("express");
const app = express()

app.get("/", (req, res) => {
  res.send("OK");
})

module.exports = app
