"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    let loc = req.params.id;
    knex
      .select("*")
      .from("food_location_join")
      .join("food", "food_id", "=", "id")
      .where("location_id", loc)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
