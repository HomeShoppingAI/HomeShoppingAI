const path = require("path")
const Dirent = require("./dirent")

const projectRoot = new Dirent(path.join(__dirname, ".."), "HomeShoppingAI", true)

module.exports = {
  projectRoot,
  data: projectRoot.dir("data"),
}