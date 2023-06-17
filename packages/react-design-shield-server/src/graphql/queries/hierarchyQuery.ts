import path from 'node:path'

import readFiles from '~domain/readFiles'
import { getApplicationPath } from '~domain/applicationPath'

import { addTypescriptSourceFiles } from '~processors/typescript/project'
import createHierarchy from '~processors/typescript/createHierarchy'

type HierarchyQuery = {
  input: string
}

async function hierarchyQuery(_: any, { input }: HierarchyQuery) {
  const files = readFiles()

  // TODO, create a watcher to update the files on change, only those that changed
  addTypescriptSourceFiles(files)

  const applicationPath = getApplicationPath()

  const mainFilePath = path.join(applicationPath, 'src/app/main.tsx')
  console.log('files', mainFilePath)

  const inputHierarchy = JSON.parse(input)
  const hierarchy = createHierarchy(mainFilePath, inputHierarchy, true)

  return JSON.stringify(hierarchy)
}

export default hierarchyQuery
