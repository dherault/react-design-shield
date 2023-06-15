import { ReactNode } from 'react'
import { useQuery } from 'urql'

import { HierarchyQuery, HierarchyQueryDataType } from '~queries'

type HierarchyProviderProps = {
  children: ReactNode
}

function HierarchyProvider({ children }: HierarchyProviderProps) {
  const [{ data: hierarchy, fetching, error }] = useQuery<HierarchyQueryDataType>({
    query: HierarchyQuery,
  })

  console.log('hierarchy', hierarchy)

  return (
    <div>
      {children}
    </div>
  )
}

export default HierarchyProvider
