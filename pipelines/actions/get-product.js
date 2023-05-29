const { getProductById } = require("../../services/product")

module.exports = (context) => {
  const productId = context.assert("productId")

  const product = getProductById(productId)

  console.log(JSON.stringify(product, null, 2))
}
