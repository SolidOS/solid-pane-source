const path = require('path')
const fs = require('fs')
const util = require('util')

const { name } = require('./package.json')

module.exports = {
  installAsPane
}

async function installAsPane (pluginManager) {
  const srcDirectory = path.join(__dirname, 'src')
  const filesToCopy = await util.promisify(fs.readdir)(srcDirectory)
  const copiedFiles = filesToCopy
    .map(fileName => pluginManager.copyFile(path.join(__dirname, 'src', fileName), name, fileName))
  await Promise.all(copiedFiles)
  return Promise.resolve({
    name
  })
}
