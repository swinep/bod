/**
 * Created by bala on 9/5/18.
 */


var express = require("express");
var router = express.Router();
var controller = require("./controller");

router.get("/nse-eq-contract", controller.getNSEEQContract);


module.exports = router;
