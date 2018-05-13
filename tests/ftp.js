/**
 * Created by bala on 7/5/18.
 */

var ftp_promise = require('promise-ftp');

var ftp = new ftp_promise();
ftp.connect({host: "ftp.connect2nse.com", user: "ftpguest", password: "FTPGUEST"})
    .then(function (server_message) {
        console.log("Server message " + server_message);
        return ftp.list("/COMMON/NTNEAT/");
    })
    .then(function (list) {
        console.log("Directory listing");
        console.dir(list);
        return ftp.get("contract.gz");
    })
    .then(function (stream) {
        return new Promise(function (resolve, reject) {
            stream.once("close", resolve);
            stream.onc("error", reject);
            stream.pipe(fs.createWriteStream("contract.gz"));
        });
    })
    .then(function () {
        return ftp.end();
    })
    .catch(function(error) {
        console.log(error);
    });