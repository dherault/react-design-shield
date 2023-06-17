export type HierarchyInputType = {
  tag: string,
  nodeType: Node['nodeType'],
  children: HierarchyInputType[],
}
