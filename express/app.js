const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
app.set("view engine", "ejs");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const mongoose = require("mongoose");
const Articals = require("./models/Articals");

mongoose
  .connect("mongodb://127.0.0.1:27017/Articals")
  .then(() => console.log("DB CONNECTED!"))
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.get("/", async (req, res) => {
  const Artical = await Articals.find({});
  console.log(Artical.length);
  res.render("index", { Artical });
});
app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/addcomment", async (req, res) => {
  console.log(req.body);
  const newartical = new Articals({
    id: uuid(),
    title: req.body.title,
    discription: req.body.discription,
    Markdown: req.body.Markdown,
  }).save();
  const Artical = await Articals.find({});
  console.log(Artical);
  res.status(200).render("index", { Artical });
});
app.get("/showcomment/:id", async (req, res) => {
  var id = req.params["id"];
  const result = await Articals.find({ id: { $regex: `^${id}` } });
  console.log(result);
  res.render("showcomment", { result: result[0] });
});
app.get("/changedata/:id", async (req, res) => {
  var id = req.params["id"];
  const result = await Articals.find({ id: { $regex: `^${id}` } });
  // console.log(result);
  res.render("changedata", { user: result[0] });
});
app.patch("/modify/:id", async (req, res) => {
  var id = req.params["id"];
  const newvalues = {
    $set: {
      title: req.body.title,
      discription: req.body.discription,
      Markdown: req.body.Markdown,
    },
  };
  const result1 = await Articals.updateOne(
    { id: { $regex: `^${id}` } },
    newvalues
  );
  const result = await Articals.find({ id: { $regex: `^${id}` } });
  console.log(result);
  res.render("showcomment", { result: result[0] });
});
app.delete("/delete/:id", async (req, res) => {
  var id = req.params["id"];
  console.log(id);

  const result = await Articals.deleteOne({ id: { $regex: `^${id}` } });
  console.log(result);

  res.redirect("/");
});
app.listen(5000, () => {
  console.log("server started");
});
