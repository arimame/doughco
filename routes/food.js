"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("food_location_join")
      .join("food", "food_id", "=", "id")
      .where("location_id", foo)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
