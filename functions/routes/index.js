var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/admin/login");
  // res.render("index", { title: "Express" });
});

router.post("/admin", function(req, res) {
  res.redirect("/admin/login");
});

module.exports = router;
