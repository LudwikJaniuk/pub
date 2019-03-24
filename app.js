var express = require("express");
var app = express();

// In this file we only define the API between the web, and our server. 
// Zero actual functionality.

app.use(bodyParser.json());
app.use("/", routes.homepage)
app.use("/creators", routes.homepage)

