const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Defind path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Main page!", name: "Vitali Sakalou" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page!",
    text: "Bla-bla-bla!!!",
    name: "Vitali Sakalou"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page!",
    text: "Heeeeeelp!!!",
    name: "Vitali Sakalou"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  } else {
    geocode(req.query.address, (error, { lat, long, place } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lat, long, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          city: place,
          name: "Vitali Sakalou"
        });
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "No help page with this article",
    text: "Heeeeeelp!!!",
    name: "Vitali Sakalou"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    text: "Error 404!",
    name: "Vitali Sakalou"
  });
});

app.listen(port, () => {
  console.log(`Server running ${port}`);
});
