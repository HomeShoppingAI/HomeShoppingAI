require("dotenv").config()

const required = (key) => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing ENV: ${key}`)
  }

  return value
}

module.exports = {
  openAI: {
    apiKey: required("OPEN_AI_API_KEY"),
  },
  printful: {
    apiKey: required("PRINTFUL_API_KEY"),
    baseUrl: "https://api.printful.com",
  },
}
