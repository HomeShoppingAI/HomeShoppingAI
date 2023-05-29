const { createNewProduct, getProductById } = require("../../services/product")

module.exports = (context) => {
  const productId = context.productId

  // If a productId is already specified, continue filling it out instead of creating a new one
  if (productId) {
    return
  }

  const product = createNewProduct({ whatever: "text" })

  console.log("Created Product:", JSON.stringify(product, null, 2))

  context.productId = product.id
}
