/**
 * Created by bala on 19/5/18.
 */

var fs = require("fs");

/**
 * Function to parse the individual security
 * @method parseEQSecurity
 * @param row
 */
function parseEQSecurity(row) {
    row = row.split("|");
    var token_index = 0;
    var symbol_index = 1;
    var series_index = 2;
    var tick_size_index = 20;
    var name_index = 21;
    var isin_index = 53;
    var lot_size_index = 19;
    var circuit_limit_index = 6;
    var security_status_index = 7;
    var eligibility_index = 8;
    var listing_date_index = 23;

    var token = row[token_index];

    if ("NEATCM" === token)
        return;

    var series = row[series_index].trim().toUpperCase();
    var name = row[name_index];
    var symbol = row[symbol_index];
    var tick_size = row[tick_size_index];
    var isin = row[isin_index];
    var lot_size = row[lot_size_index];
    var circuit_limit = row[circuit_limit_index].trim();
    circuit_limit = circuit_limit.split("-");
    var lower_circuit = circuit_limit[0];
    var upper_circuit = circuit_limit[1];
    var security_status = row[security_status_index];
    var eligibility = row[eligibility_index];

    var listing_date_secs = parseInt(row[listing_date_index]) + 315513000;
    var data = {
        token: parseInt(token)
        , symbol: symbol
        , series: series
        , name: name
        , cp: ""
        , isin: isin
        , lot_size: lot_size
        , status: "Eligible"
        , tick_size: parseFloat(tick_size)
        , exchange: "NSE_EQ"
        , lower_circuit: parseFloat(lower_circuit)
        , upper_circuit: parseFloat(upper_circuit)
    };
    console.log(JSON.stringify(data));
    if (3 !== parseInt(security_status)) {
        if (1 !== parseInt(eligibility)) {
            // if today is listing data, make it eligible.
            data.status = "NotEligible";
        }
    } else {
        data.status = "Suspended";
        return {};
    }
    return data;
}

/**
 * Function which does processing of NSE securities file.
 * @method processNSESecurities
 */
function processNSESecurities() {
    var file_name = "../../../contract-files/nse_security.txt";
    fs.readFile(file_name, 'utf8', function (err, data) {
        if (err) throw err;
        data = data.split("\n");
        // console.log(data);
        for (var index = 0; index < data.length; ++index) {
            parseEQSecurity(data[index]);
        }
    });
}

module.exports = {
    processNSESecurities: processNSESecurities
};
