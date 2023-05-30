const client = require("https")
const fs = require("fs")
const path = require("path")

class Dirent {
  constructor(path, name, isDir) {
    this.path = path
    this.name = name
    this.isDir = isDir
  }

  dir(dirName) {
    const dirPath = path.join(this.path, dirName)

    if (!fs.existsSync(dirPath)) {
      throw new Error(`No directory at path: ${dirPath}`)
    }

    const stats = fs.lstatSync(dirPath)

    if (!stats.isDirectory()) {
      throw new Error(`Item at ${dirPath} is not a directory`)
    }

    return new Dirent(dirPath, dirName, true)
  }

  file(fileName) {
    const filePath = path.join(this.path, fileName)

    if (!fs.existsSync(filePath)) {
      throw new Error(`No file at path: ${filePath}`)
    }

    const stats = fs.lstatSync(filePath)

    if (!stats.isFile()) {
      throw new Error(`Item at ${filePath} is not a file`)
    }

    return new Dirent(filePath, fileName, false)
  }

  get isDirectory() {
    return this.isDir
  }

  get isFile() {
    return !this.isDir
  }

  get extension() {
    return path.extname(this.path)
  }

  list() {
    return fs
      .readdirSync(this.path, { withFileTypes: true })
      .map(dirent => new Dirent(
        path.join(this.path, dirent.name),
        dirent.name,
        dirent.isDirectory(),
      ))
  }

  text() {
    if (this.isDir) {
      throw new Error("Cannot read text of directory")
    }

    return fs.readFileSync(this.path, 'utf8')
  }

  json() {
    return JSON.parse(this.text())
  }

  writeText(filename, text) {
    if (!this.isDir) {
      throw new Error("Unable to write file to other file")
    }

    const newFilePath = path.join(this.path, filename)
    fs.writeFileSync(newFilePath, text)
  }

  writeJson(filename, object) {
    const text = JSON.stringify(object, null, 2) // Formatted to make by hand editing easier and git changes more obvious
    this.writeText(filename, text)
  }

  writeContentsAtUrl(filename, url) {
    if (!this.isDir) {
      throw new Error("Unable to write file to other file")
    }

    let finalFilename = filename

    // If filename doesn't have extension, pull extension from URL
    if (!path.extname(filename)) {
      finalFilename = filename + path.extname(url)
    }

    const newFilePath = path.join(this.path, finalFilename)


    return new Promise((resolve, reject) => {
      client.get(url, (res) => {
          if (res.statusCode === 200) {
              res
                .pipe(fs.createWriteStream(newFilePath))
                .on('error', reject)
                .once('close', () => resolve(newFilePath))
          } else {
              // Consume response data to free up memory
              res.resume()
              reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`))
          }
      });
  });
  }
}

module.exports = Dirent
