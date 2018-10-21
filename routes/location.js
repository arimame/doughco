"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // select all locations
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("location")
      .then((results) => {
        res.json(results);
    });
  }),

  // select all locations with 'id'
  router.get("/:id", (req, res) => {
    knex("location")
    .where({id: req.params.id})
    .then ((results) => {
      res.json(results);
    });
  });

  return router;
}
