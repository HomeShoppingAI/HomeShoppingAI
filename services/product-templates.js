const productTemplatesDir = require("./files").data.dir("product-templates")

const direntToProductTemplate = (dirent) => {
  if (!dirent.isDirectory) {
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
const listAll = () => productTemplatesDir.list().filter(d => d.isDirectory).map(direntToProductTemplate)
const pickRandom = () => {
  const all = productTemplatesDir.list().filter(d => d.isDirectory)
  const random = all[Math.floor(Math.random() * all.length)]
  return direntToProductTemplate(random)
}

module.exports = {
  findByName,
  listAll,
  pickRandom,
}
