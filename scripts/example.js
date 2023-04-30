const config = require("../config")

const printful = require("../services/printful")

printful.listAllProducts().then(result => console.log(result)).catch(e => console.error(e))
