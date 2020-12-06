var express = require("express");
var router = express.Router();

const { makeAppointment } = require("./todoController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/make-appointment", makeAppointment);

module.exports = router;
