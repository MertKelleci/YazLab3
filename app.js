const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/yazlab3");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const userSchema = {
  Email: String,
  Password: String,
  Admin: Boolean,
};
const User = mongoose.model("User", userSchema);
let logedIn = false;
let flag = false;

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/login", function (req, res) {
  res.render("login", { loginFlag: false, signupFlag: false });
});

app.post("/login", function (req, res) {
  console.log(req.body);
  User.find({ Email: req.body.Email }, function (err, results) {
    if (!err) {
      if (results[0].Password !== req.body.Password) {
        res.render("login", { loginFlag: true, signupFlag: false });
      } else {
        res.redirect("/user");
      }
    } else {
      res.render("login", { loginflag: true, signupFlag: false });
    }
  });
});

app.get("/user", function (req, res) {
  res.render("user");
});

app.post("/signup", function (req, res) {
  console.log(req.body);
  if (!req.body.Admin) {
    console.log("Not admin");
  } else {
    console.log("Admin");
  }
  User.find({ Email: req.body.Email }, function (err, results) {
    if (results.length > 0) {
      res.render("login", { loginFlag: false, signupFlag: true });
    } else {
      let Admin;
      if (!req.body.Admin) {
        Admin = false;
      } else {
        Admin = true;
      }
      const newUser = new User({
        Email: req.body.Email,
        Password: req.body.Password,
        Admin: Admin,
      });

      newUser.save();

      res.redirect("/user");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
