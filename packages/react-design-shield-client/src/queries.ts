/* --
  * QUERIES
-- */

export const HierarchyQuery = `
  query ($input: String!) {
    hierarchy (input: $input)
  }
`

export type HierarchyQueryDataType = {
  hierarchy: string
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
