/**
 * Created by bala on 7/5/18.
 */


var AnyFile = require('any-file');

var any_file = new AnyFile();
var fromFile ="ftp://ftpguest:FTPGUEST@ftp.connect2nse.com//COMMON/NTNEAT/security.gz";
var toFile = "../contract-files/nse_security.gz";
any_file.from(fromFile).to(toFile, function(err, res) {
    if (res) {
        console.log("File copied!");
    } else {
        console.log("File not copied!");
        console.log(err);
    }
});