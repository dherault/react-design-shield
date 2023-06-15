import { JsxChild, Node as TsNode } from 'ts-morph'

export type FileType = {
  path: string
  code: string
}

export type HierarchyType = {
  id: string
  name: string
  type: 'component' | 'element' | 'text' | 'array' | 'children'
  start: number
  element: HTMLElement | null
  children: HierarchyType[]
  onFilePath: string
  cursors: number[]
}

export type ExtendedHierarchyContextType = {
  id: string
  previousTopJsxIds: string[]
  childIndex: number,
  children: JsxChild[]
  imports: ImportType[]
  identifiers: IdentifierType[]
  childrenOnFilePath: string
}

export type ExtendedHierarchyType = Omit<HierarchyType, 'children' | 'cursors'> & {
  children: ExtendedHierarchyType[]
  childrenElements: HTMLElement[]
  childrenElementsStack: HTMLElement[]
  context: ExtendedHierarchyContextType
}

export type ImportType = {
  type: 'default' | 'named'
  source: string
  name: string
  sourceFilePath: string
}

export type ExportType = {
  type: 'default' | 'named'
  name: string
}

export type IdentifierType = {
  name: string
  value: TsNode,
}
