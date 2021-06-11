const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/infoDB", { useNewUrlParser: true });

const infoSchema = {
  title: String,
  content: String,
};

const Info = mongoose.model("Info", infoSchema);

app._router
  .route("/articles")
  .get(function (req, res) {
    Info.find(function (err, result) {
      if (!err) {
        res.send(result);
      }
    });
  })
  .post(function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);
    const newInfo = new Info({
      title: req.body.title,
      content: req.body.content,
    });
    newInfo.save(function (err) {
      if (!err) {
        res.send("Article saved successfully");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Info.deleteMany(function (err) {
      if (!err) {
        res.send("Articles Deleted");
      } else {
        res.send(err);
      }
    });
  });
app.listen(3000, function () {
  console.log("Server started on port 3000");
});

app.get("/", function (res, req) {
  req.send("Hello Wolrd!");
});
