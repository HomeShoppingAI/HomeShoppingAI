const request = require("superagent")
const { apiKey, baseUrl} = require("../config").printful

const transformError = (error) => {
  if (error.response && error.response.body) {
    throw new Error(`Printful error: ${error.response.body.result}`)
  }

  throw error
}

// Printful Catalog
const listCatalog = () => request
  .get(`${baseUrl}/products`)
  .set("Authorization", `Bearer ${apiKey}`)
  .then(res => res.body.result)
  .catch(transformError)

// Products
const listMyProducts = () => request
  .get(`${baseUrl}/sync/products`)
  .set("Authorization", `Bearer ${apiKey}`)
  .set("X-PF-Store-Id", "10513718")
  .then(res => res.body.result)
  .catch(transformError)

const getProductById = (id) => request
  .get(`${baseUrl}/sync/products/${id}`)
  .set("Authorization", `Bearer ${apiKey}`)
  .set("X-PF-Store-Id", "10513718")
  .then(res => res.body.result)
  .catch(transformError)

const createProduct = (product) => request
  .post(`${baseUrl}/store/products`)
  .set("Authorization", `Bearer ${apiKey}`)
  .set("X-PF-Store-Id", "10513718")
  .send(product)
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
  // Printful Catalog
  listCatalog,

  // Products
  listMyProducts,
  getProductById,
  createProduct,

  // Product Templates
  findProductTemplateById,
  listProductTemplates,
}
