const uuid = require("uuid").v4
const { projectRoot } = require("../../services/files")
const openAI = require("../../services/openai")
const products = require("../../services/product")

const assetDir = projectRoot.dir("data").dir("assets")

module.exports = async (context) => {
  const productId = context.assert("productId")

  const product = products.getById(productId)

  if (!product.assets) {
    throw new Error(`Invalid product (id ${product.id}) does not have "assets" key`)
  }

  let nextAsset = product.assets.find(a => !a.id)
  let updatedAssets = 0

  while (nextAsset) {
    console.log(`Generating image for prompt "${nextAsset.prompt}"`)

    const imageUrl = await openAI.createImageFromPrompt(nextAsset.prompt)

    const id = uuid()

    console.log(`Downloading image from ${imageUrl} as asset Id ${id}`)

    await assetDir.writeContentsAtUrl(id, imageUrl)

    nextAsset.id = id

    updatedAssets += 1

    nextAsset = product.assets.find(a => !a.id)
  }

  if (updatedAssets) {
    console.log(`Resaving product ${product.id} with ${updatedAssets} new assets`)
    // TODO: Save notes on what changed for git commits?
    products.save(product)
  } else {
    console.log(`All assets already loaded for product ${product.id}`)
  }
}
