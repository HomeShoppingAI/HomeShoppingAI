const config = require("../config")

const assets = require("../services/assets")

assets.createAssetFromPrompt("Hello world!").then(a => console.log(a)).catch(e => console.error(e))
