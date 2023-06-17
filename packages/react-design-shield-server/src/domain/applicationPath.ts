let applicationPath: string | null = null

export function setApplicationPath(path: string) {
  applicationPath = path
}

export function getApplicationPath() {
  return applicationPath || process.cwd()
}
