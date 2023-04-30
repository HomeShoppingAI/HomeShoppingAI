const uuid = require("uuid").v4
const openai = require("./openai")

const createAssetFromPrompt = async (prompt) => {
  const id = uuid()
  // TODO: Download image and save locally by ID, return id
  return await openai.createImageFromPrompt(prompt)
}

module.exports = {
  createAssetFromPrompt,
}
