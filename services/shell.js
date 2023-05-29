const { exec } = require("child_process")

const execute = (command, silent) => {
  console.log(`$ ${command}\n`)

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
        reject(err)
      } else {
        if (!silent) {
          console.log(stdout)
        }
        resolve(stdout)
      }
    })
  })
}

module.exports = {
  execute,
}
