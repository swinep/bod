/**
 * Created by bala on 9/5/18.
 */


var express = require("express");
var router = express.Router();
var controller = require("./controller");

router.get("/process-securities", controller.processNSESecurities);


module.exports = router;
