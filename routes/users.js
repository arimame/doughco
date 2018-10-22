"use strict";

const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();

module.exports = (knex) => {

  // get user object, given email
  router.get("/:email", (req, res) => {
    knex('users')
      .where({email: req.params.email})
      .then((results) => {
        res.json(results);
    });
  });

  // 'handle registration' (albeit badly)
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

  router.post("/update/cc/:email", (req, res ) => {
    let {name, card_number, card_security, card_expire} = req.body || undefined;
    knex('users')
    .where({email: req.params.email})
    .update({
      name: name, card_number: Number(card_number), card_security: Number(card_security), card_expire: Number(card_expire)
    }).then((results) => {
      console.log(`\nUpdated card information for ${req.params.email}. Fancy.\n`);
      res.redirect('/');
    });

  });

  router.post("/update/contact/:email", (req, res ) => {
    let {email, phone} = req.body || undefined;
    req.session.user = email;
    knex('users')
    .where({email: req.params.email})
    .update({
      email, phone: Number(phone)
    }).then((results) => {
      console.log(`\nUpdated contact information for ${req.params.email}. Groovy.\n`);
      res.redirect('/');
    });
  });

	return router;
}
