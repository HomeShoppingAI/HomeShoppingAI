const fs = require("fs")
const path = require("path")

const dataDir = path.join(__dirname, "..", "data")

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

  isDirectory() {
    return this.isDir
  }

  isFile() {
    return !this.isDir
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
}

module.exports = new Dirent(dataDir, "data", true)
