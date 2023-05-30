const { Chat } = require("../../services/openai")
const products = require("../../services/product")
const productTemplates = require("../../services/product-templates")

// TODO: Make these prompts good / useful
const writeProductDescription = async (productTypeDescription, theme) => {
  const chat = new Chat()
  return await chat.respondAsUser(`
Please write a detailed product description for a new product idea that you will be selling.

Here are the details on the materials of the product:

${productTypeDescription}

And the theme of the design is:

${theme}

You are free to flesh out the ideas for the product design itself and from there please write a detailed product description
  `)
}

const summarizeProductDescription = async (productDescription) => {
  const chat = new Chat()
  return await chat.respondAsUser(`
Please summarize the following long product description as a short summary, highlighting only the most important parts:

${productDescription}
  `)
}

const writeImagePromptForAsset = async (productDescription, productTypeAsset) => {
  const chat = new Chat()
  return await chat.respondAsUser(`
Please write an image prompt for the following product:

${productDescription}

The image that you need to generate for this product is ${productTypeAsset.context}

Please write an image prompt for generative AI to make an image for that purpose
  `)
}

// TODO: Make this work for something other than images? Or rename these to just be images
const stubOutAssets = (productDescription, productTypeAssets) => {
  return Promise.all(productTypeAssets.map(async asset => {
    const prompt = await writeImagePromptForAsset(productDescription, asset.context)
    return {
      type: asset.type,
      prompt,
    }
  }))
}

module.exports = async (context) => {
  const productId = context.productId

  if (productId) {
    console.log(`Passed in explicit product Id (${productId}) - continuing to fill out this product instead of creating a new one`)
    return
  }

  const productTypeName = context.assert("productType")

  let productType

  if (productTypeName === "random") {
    console.log("Selecting random product template")
    productType = productTemplates.pickRandom()
  } else {
    productType = productTemplates.findByName(productTypeName)
  }

  console.log(`Using product type "${productTypeName}"`)

  let theme = context.theme

  if (!theme) {
    // TODO: Get OpenAI to derive a theme? Have defaults baked in to each product type?
    throw new Error("Unimplemented Theme Creation - pass explicit theme for now")
  }

  console.log("Using theme: ", theme)

  // FIXME: Set up billing for OpenAI
  const description = await writeProductDescription(productType.description, theme)
  const summary = await summarizeProductDescription(description)
  const assets = await stubOutAssets(description, productType.assets)

  const product = products.createNew({
    type: productType.name,
    summary,
    theme,
    description,
    assets,
  })

  console.log("Created product:", JSON.stringify(product, null, 2))

  context.productId = product.id
}
