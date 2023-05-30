const { Configuration, OpenAIApi } = require("openai")
const config = require("../config").openAI

const configuration = new Configuration({
  apiKey: config.apiKey,
})

const client = new OpenAIApi(configuration)

class Chat {
  constructor(options) {
    const safeOptions = options || {}
    const { model, messages, ...filteredOptions } = safeOptions

    this.model = model || "gpt-3.5-turbo"
    this.messages = messages || []
    this.options = filteredOptions
  }

  seedSystem(content) {
    this.messages.push({ role: "system", content })
  }

  seedAssistant(content) {
    this.messages.push({ role: "assistant", content })
  }

  async respondAsUser(content) {
    this.messages.push({ role: "user", content })

    const response = await openai.createChatCompletion({
      model: this.model,
      messages: this.messages,
      ...this.options,
    })

    const newMessages = response.data.choices.map((choice) => choice.message)
    this.messages.push(...newMessages)

    return newMessages
  }
}

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
  Chat,
}
