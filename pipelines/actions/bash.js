const { execute } = require("../../services/shell")

module.exports = async (context) => {
  await execute("pwd")
  await execute("ls -al")
}
