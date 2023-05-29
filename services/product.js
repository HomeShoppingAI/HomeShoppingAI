const data = require("./data")

const productDir = data.dir("products")

const nextId = () => {
  const productIds = productDir
    .list()
    .filter(f => f.extension === ".json")
    .map(f => Number(f.name.replace(".json", "")))

  const highestId = Math.max(0, ...productIds)
  return highestId + 1
}

const createNewProduct = (values) => {
  const id = nextId()

  const product = {
    ...values,
    id,
  }

  productDir.writeJson(`${id}.json`, product)

  return product
}

const getProductById = (id) => {
  return productDir.file(`${id}.json`).json()
}

module.exports = {
  createNewProduct,
  getProductById,
}