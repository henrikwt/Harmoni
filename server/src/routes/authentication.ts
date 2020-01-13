import express from "express";
import { pool } from "../dao/database";
import userDao from "../dao/userDao";

var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.json());
let publicKey;
let privateKey = (publicKey = "superSecret");
router.use(express.static("public"));

router.use("/authorized", (req, res, next) => {
  var token = req.headers["x-access-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token Not ok");
      res.status(401);
      res.json({ error: "Not authorized" });
    } else {
      let token = jwt.sign({ email: req.body.email }, privateKey, {
        expiresIn: 30 * 60
      });
      localStorage.setItem("x-access-token", token);
      next();
    }
  });
});

module.exports = router;
