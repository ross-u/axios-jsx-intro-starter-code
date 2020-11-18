const express = require("express");
const siteRouter = express.Router();
const axios = require("axios");

// Your routes
siteRouter.get("/countries", (req, res, next) => {
  axios
    .get("https://restcountries.eu/rest/v2")
    .then((response) => {
      const countriesArr = response.data;
      const props = { countriesArr: countriesArr };

      res.render("Countries", props);
    })
    .catch((err) => console.log(err));
});

module.exports = siteRouter;
