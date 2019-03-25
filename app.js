var express = require("express");

// app is the object that describes the whole... app. 
// First we create an empty app, then we procedurally modify it to add
// all the functionality we want.
const app = express()

// We add an endpoint (GET /) and define what funciton should be called to handle it
app.get("/", (req, res) => {
  res.status(500).send("Not implemented");
})

app.get("/api/all", (req, res) => {
  res.status(500).send("Not implemented");
})

app.get("/api/post/:id", (req, res) => {
  res.status(500).send("Not implemented");
});

app.post("/api/post", (req, res) => {
  res.status(500).send("Not implemented");
});

app.delete("/api/post/:id", (req, res) => {
  res.status(500).send("Not implemented");
});

module.exports = app
