/**
 * Created by bala on 9/5/18.
 */

var AnyFile = require("any-file");
var Promise = require("bluebird");
const gunzip = require('gunzip-file');

/**
 * Function to download contract file through ftp
 * @method downloadFile
 * @param src_file
 * @param dest_file
 */
function downloadFile(src_file, dest_file) {
    var any_file = new AnyFile();
    return new Promise(function (resolve, reject) {
        any_file.from(src_file).to(dest_file, function (err, response) {
            if (response) {
                console.log("Successfully copied the file - " + dest_file);
                resolve();
            } else {
                console.log("Some error in copying the file");
                console.log(err);
                reject();
            }
        });
    });
}

/**
 * Function helps in unzipping the gz file
 * @method unzipFile
 * @param path
 * @param output
 */

function unzipFile(path, output) {
    new Promise(function (resolve, reject) {
        gunzip(path, output, function () {
            console.log('Successfully unzipped the file ' + path);
            resolve();
        });
    });
}

/**
 * Function to download the nseEQ contract file.
 * @method getNSEEQContract
 */
function getNSEEQContract(req, res) {
    var src_file = "ftp://ftpguest:FTPGUEST@ftp.connect2nse.com/COMMON/NTNEAT/security.gz";
    var dest_file = "../contract-files/nse_security.gz";
    var output_file = "../contract-files/nse_security.txt";
    downloadFile(src_file, dest_file)
        .then(function () {
            return unzipFile(dest_file, output_file);
        })
        .then(function () {
            res.send({message: "Successfully downloaded contract file"});
        })
        .catch(function (err) {
            console.log(err);
            res.send({message: "Unable to download the contract file"});
        })
}

module.exports = {
    getNSEEQContract: getNSEEQContract
};