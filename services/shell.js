const { exec } = require("child_process")

const execute = (command) => {
  console.log(`$ ${command}`)

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
        reject(err)
      } else {
        console.log(stdout)
        resolve(stdout)
      }
    })
  })
}

module.exports = {
  execute,
}
