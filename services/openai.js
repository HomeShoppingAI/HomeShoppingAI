const { Configuration, OpenAIApi } = require("openai")
const config = require("../config").openAI

const configuration = new Configuration({
  apiKey: config.apiKey,
})

const client = new OpenAIApi(configuration)

const transformError = (e) => {
  if (e.response) {
    throw new Error(`OpenAI error: ${e.response.data.error.message}`)
  }

  throw e
}

const createImageFromPrompt = async (prompt) => client
  .createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "url",
  })
  .then(res => res.data.data[0].url)
  .catch(transformError)

module.exports = {
  createImageFromPrompt,
}
