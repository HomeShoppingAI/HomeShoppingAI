const path = require("path")
const Dirent = require("./dirent")

const dataDir = path.join(__dirname, "..", "data")

module.exports = new Dirent(dataDir, "data", true)
