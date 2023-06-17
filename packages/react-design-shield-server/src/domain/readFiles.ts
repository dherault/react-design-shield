import fs from 'node:fs'
import path from 'node:path'

import { FileType } from '~types'

import { getApplicationPath } from '~domain/applicationPath'

function readFiles() {
  const files: FileType[] = []
  const applicationPath = getApplicationPath()
  const srcPath = path.join(applicationPath, 'src')
  const nodeModulesPath = path.join(applicationPath, 'node_modules')

  function readDirectory(location: string, isNodeModules = false) {
    fs.readdirSync(location).forEach(fileName => {
      const filePath = path.join(location, fileName)

      if (fs.statSync(filePath).isDirectory()) {
        return readDirectory(filePath, isNodeModules)
      }

      if (isNodeModules && !filePath.endsWith('.d.ts')) return

      files.push({
        path: filePath,
        code: fs.readFileSync(filePath, 'utf8'),
      })
    })
  }

  function traverseDependencies(dependencies: string[]) {
    dependencies.forEach(packageName => {
      try {
        readDirectory(path.join(nodeModulesPath, packageName), true)
      }
      catch {
        console.log(packageName)
      }
    })
  }

  readDirectory(srcPath)

  traverseDependencies([
    '@types/react',
    '@types/react-dom',
  ])

  return files
}

export default readFiles
