const { execute } = require("../../services/shell")

module.exports = async (context) => {
  const unstagedDiff = await execute("git diff --stat")
  const stagedDiff = await execute("git diff --staged --stat")

  if (unstagedDiff !== "" || stagedDiff !== "") {
    if (context.force) {
      console.log("Continuing with pipeline in spite of uncommited changes due to `force` flag")
    } else {
      throw new Error("Halting pipeline due to uncommitted changes")
    }
  }
}
