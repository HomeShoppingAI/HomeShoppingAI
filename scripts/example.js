const config = require("../config")

const productTemplates = require("../services/product-templates")

console.log(productTemplates.findByName("mug"))
