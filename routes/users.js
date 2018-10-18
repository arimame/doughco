"use strict";

const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/register", (req, res) => {
  	const {email, password} = req.body || undefined;
  	const hashedPassword = bcrypt.hashSync(password, 10);
  	req.session.user = email;

  	knex('users')
  		.insert({
				email: email,
  			password: hashedPassword
  		})
  		.then((results) => {
  			console.log(`\nAdded ${email} to the database. Nifty.\n`);
  			res.redirect('/');
  		});

  });

	return router;
}
