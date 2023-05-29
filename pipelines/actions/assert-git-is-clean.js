const { execute } = require("../../services/shell")

module.exports = async (context) => {
  const diff = await execute("git diff --staged --stat", true)

  if (diff !== "") {
    throw new Error(`Halting Pipeline because of uncommitted changes:\n${diff}`)
  }
}
