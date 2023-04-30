const { Configuration, OpenAIApi } = require("openai")
const config = require("../config").openAI

const configuration = new Configuration({
  apiKey: config.apiKey,
})

module.exports = new OpenAIApi(configuration)
