const products = require("../../services/product")

module.exports = (context) => {
  const productId = context.assert("productId")

  const product = products.getById(productId)

  console.log(JSON.stringify(product, null, 2))
}
