const request = require("superagent")
const { apiKey, baseUrl} = require("../config").printful

const transformError = (error) => {
  if (error.response && error.response.body) {
    throw new Error(`Printful error: ${error.response.body.result}`)
  }

  throw error
}

// Products
const listAllProducts = () => request
  .get(`${baseUrl}/products`)
  .set("Authorization", `Bearer ${apiKey}`)
  .then(res => res.body.result)
  .catch(transformError)

// Product Templates
const findProductTemplateById = (id) => request
  .get(`${baseUrl}/product-templates/${id}`)
  .set("Authorization", `Bearer ${apiKey}`)
  .then(res => res.body.result)
  .catch(transformError)

const listProductTemplates = () => request
  .get(`${baseUrl}/product-templates`)
  .set("Authorization", `Bearer ${apiKey}`)
  .then(res => res.body.result.items)
  .catch(transformError)

module.exports = {
  // Products
  listAllProducts,

  // Product Templates
  findProductTemplateById,
  listProductTemplates,
}
