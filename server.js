"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
// morgan is used for logging request details.
// `dev` is a predefined format for morgan to use.
const morgan      = require('morgan');
// i'm assuming knex logger does the same for database
// modifications.
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Seperated Routes for each Resource
const foodRoutes = require("./routes/food");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Mount all resource routes
app.use("/api/food", foodRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.redirect("/locations");
});

app.get("/locations", (req, res) => {
  res.render("index");
});

app.get("/myaccount", (req, res) => {
  res.render("myaccount");
});

app.get("/locations/:id", (req, res) => {
  let location_id = req.params.id;
  let templateVars = {location_id: location_id};
  res.render("menu", templateVars);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
