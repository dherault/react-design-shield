import { ReactNode } from 'react'
import { Provider as GraphqlProvider } from 'urql'

import client from '../client'

import HierarchyProvider from './HierarchyProvider'

type DesignShieldProps = {
  children: ReactNode
}

function DesignShield({ children }: DesignShieldProps) {
  return (
    <GraphqlProvider value={client}>
      <HierarchyProvider>
        {children}
      </HierarchyProvider>
    </GraphqlProvider>
  )
}

export default DesignShield
