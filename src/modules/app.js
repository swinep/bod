/**
 * Created by bala on 9/5/18.
 */

/*
 * Imports
 */
const express = require("express");
const app = express();
const body_parser = require("body-parser");
var fs = require("fs");
var _ = require("underscore");
var util = require("util");
var http = require('http');


/**
 *@method loadModules
 */
function loadModules() {
    var names = fs.readdirSync(__dirname);
    console.log(names);
    _.each(names, function (name, index) {
        if (0 != index) {
            var route = require("./" + name + "/route");
            app.use(util.format('/%s', name), route);
        }
    });
}

/**
 * @method startApp
 */
function startApp() {
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({extended: true}));
    app.get('/', function (req, res) {
        res.send({timestamp: new Date().getTime()});
    });
    loadModules();
    app.listen(3000, function () {
        console.log("App listening on port 3000");
    });
    http.createServer(app);
}

startApp();