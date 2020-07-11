var express = require("express");
var router = express.Router();

var admin = require("firebase-admin");

var authService = require('../firebase/firebase_auth');

////////////////////////////////////////////////////////////
// 1
router.get("/login", function (req, res) {
  res.render("admin/login", {
    message: ""
  });
});

// 2
// Admin Login
router.post("/checkLogin", function (req, res) {
  req.session.admin = 'Login';
  console.log('Login button tapped');

  const userEmail = req.body.email;
  const userPassword = req.body.password;

  authService.signIn(userEmail, userPassword,
    function (result) {
        res.redirect("/category/all");
    },
    function (error) {
      return res.status(401).send(error);
    });
});

// 3
// Admin Logout
router.get("/logout", function (req, res) {
  if (!(req.session.admin === undefined)) {
    req.session.admin = undefined;
    res.redirect("/admin/login");
  } else {
    res.redirect("/admin/login");
  }
});

module.exports = router;