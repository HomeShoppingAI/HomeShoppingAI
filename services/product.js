const { data } = require("./files")

const productDir = data.dir("products")

const nextId = () => {
  const productIds = productDir
    .list()
    .filter(f => f.extension === ".json")
    .map(f => Number(f.name.replace(".json", "")))

  const highestId = Math.max(0, ...productIds)
  return highestId + 1
}

const createNew = (values) => {
  const id = nextId()

  const product = {
    id,
    ...values,
  }

  productDir.writeJson(`${id}.json`, product)

  return product
}

const getById = (id) => {
  return productDir.file(`${id}.json`).json()
}

const save = (product) => {
  if (!product.id) {
    product.id = nextId()
  }

  productDir.writeJson(`${product.id}.json`, product)
}

module.exports = {
  createNew,
  getById,
  save,
}