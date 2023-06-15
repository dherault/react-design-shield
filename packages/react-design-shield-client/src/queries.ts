/* --
  * QUERIES
-- */

export const HierarchyQuery = `
  query {
    hierarchy
  }
`

export type HierarchyQueryDataType = {
  hierarchy: boolean
}

/* --
  * MUTATIONS
-- */

// export const UploadFileMutation = `
//   mutation ($file: Upload!, $fileName: String!) {
//     uploadFile (file: $file, fileName: $fileName)
//   }
// `

// export type UploadFileMutationDataType = {
//   uploadFile: string
// }
