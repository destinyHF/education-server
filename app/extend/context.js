const Schema = require("async-validator").default;

module.exports = {
  asyncValidate(rule,value){
    return new Schema(rule).validate(value);
  }
}