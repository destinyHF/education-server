const moment = require("moment");
const CryptoAES = require("./utility/aes");

exports.relativeTime = time => moment(new Date(time*1000)).fromNow();

exports.moment = moment;

exports.CryptoAES = CryptoAES;