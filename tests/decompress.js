/**
 * Created by bala on 7/5/18.
 */

const decompress = require('decompress');

decompress('../contract-files/nse_contract.gz', '../contract-files/contract.txt').then(function (files) {
    console.log('done!');
});
