"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sseExpress  = require('sse-express');
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes    = require("./routes/users");
const foodRoutes     = require("./routes/food");
const order          = require('./lib/order-helpers');
const locationRoutes = require("./routes/location");


const cookieSession = require('cookie-session');
app.use(cookieSession({
	name: 'session',
	keys: ['hgiehgiehiwheihge', 'eutiewginibebi']
}));
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// app.use(sseExpress());

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
app.use("/api/food", foodRoutes(knex));
app.use("/api/location", locationRoutes(knex));

// Twilio
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH;
// const client = require('twilio')(accountSid, authToken);

// Home page
app.get("/", (req, res) => {
  res.redirect("/locations");
});

app.get("/locations", (req, res) => {
  res.render("index", {currUser: req.session.user});
});

app.get("/myaccount", (req, res) => {
  res.render("myaccount", {currUser: req.session.user});
});

app.get("/locations/:id", (req, res) => {
  let location_id = req.params.id;
  let templateVars = {location_id: location_id, currUser: req.session.user};
  res.render("menu", templateVars);
});

app.get("/checkout/:id", (req, res) => {
  res.render("checkout", {currUser: req.session.user, location_id: req.params.id});
});


// retrieve contents of a message sent back by restaurant, update order status
app.post('/sms', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/xml'});
  const time = req.body['Body'];
  order.update(1, time);
  res.end();
});

// processing state for order; not yet confirmed but restaurant notified
app.post("/checkout/process", (req, res) => {
  const cart = JSON.parse(req.body.cart);
  const clientEmail = req.body.clientEmail;

  let body = `New order from ${clientEmail}:\n`;


  for (let item of cart) {
    body += `${item.name}, quantity: ${item.quantity}\n`
  }

  client.messages
  .create({
     body: body,
     from: '+16474944728',
     to: '+12047208938'
   })
  .then(message => console.log(message.sid))
  .done();

})

// used to check the status of an order
app.get('/check-status', sseExpress(), function(req, res) {
  req.socket.setKeepAlive();
  function check() {
    if (order.status === 1) {
      res.sse({
        event: 'received',
        data: { welcomeMsg: 'Order confirmed' }
      });
      order.update(0);
      return;
    }
    setTimeout(check, 5000);
  }
  check();
});

// page user is brought to while waiting for order to be confirmed
app.get('/order/purgatory/:clientPhone', (req, res) => {
  res.render('order-purgatory', {clientPhone: req.params.clientPhone,
                                currUser: req.session.user});
});

// page user is brought to when the order is confiremdd
app.get('/order-confirmed/:clientPhone', (req, res) => {
  const clientPhone = req.params.clientPhone;

  const body = `Order confirmed. Your doughnuts will be ready in ${order.time} minutes!`;
  client.messages
  .create({
    body: body,
    from: '+16474944728',
    to: clientPhone
  })
  .then(message => console.log(message.sid))
  .done();

  res.render('order-confirmed', {currUser: req.session.user});
})

app.get('/logout', (req, res) => {
	req.session = null;
	res.redirect('locations');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
