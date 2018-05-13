/**
 * Created by bala on 7/5/18.
 */
var targz = require('targz');

targz.decompress({
    src: '../contract-files/nse_contract.gz',
    dest: '../contract-files/nse_contract.txt'
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Done!");
    }
});
