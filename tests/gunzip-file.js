/**
 * Created by bala on 7/5/18.
 */


const gunzip = require('gunzip-file');
gunzip('../contract-files/nse_security.gz', '../contract-files/nse_security.txt', function () {
    console.log('gunzip done!')
});