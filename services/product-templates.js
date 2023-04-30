const productTemplatesDir = require("./data").dir("product-templates")

const direntToProductTemplate = (dirent) => {
  if (!dirent.isDirectory()) {
    throw new Error(`Path ${dirent.path} is not a directory`)
  }

  const metadata = dirent.file("metadata.json").json()
  const prompt = dirent.file("prompt.txt").text()

  return {
    metadata,
    name: dirent.name,
    prompt,
  }
}

const findByName = (name) => direntToProductTemplate(productTemplatesDir.dir(name))
const listAll = () => productTemplatesDir.list().filter(d => d.isDirectory()).map(direntToProductTemplate)

module.exports = {
  findByName,
  listAll,
}
