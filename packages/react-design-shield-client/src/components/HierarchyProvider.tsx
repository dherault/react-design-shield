import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'urql'

import { HierarchyInputType } from '~types'

import { HierarchyQuery, HierarchyQueryDataType } from '~queries'

type HierarchyProviderProps = {
  children: ReactNode
}

function buildHierarchyInput(element: HTMLElement) {
  const hierarchyInput: HierarchyInputType = {
    tag: element.nodeType === Node.TEXT_NODE ? '_text_' : element.tagName.toLowerCase(),
    nodeType: element.nodeType,
    children: [],
  }

  for (const child of element.childNodes) {
    hierarchyInput.children.push(buildHierarchyInput(child as HTMLElement))
  }

  return hierarchyInput
}

function HierarchyProvider({ children }: HierarchyProviderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [hierarchyInput, setHierarchyInput] = useState<HierarchyInputType | null>(null)
  const [{ data, fetching }] = useQuery<HierarchyQueryDataType>({
    query: HierarchyQuery,
    variables: {
      input: JSON.stringify(hierarchyInput),
    },
    pause: !hierarchyInput,
  })

  console.log('data', data)

  const refreshHierarchyInput = useCallback((element: HTMLElement | null) => {
    if (!element) return

    setHierarchyInput(buildHierarchyInput(element))
  }, [])

  useEffect(() => {
    if (!rootRef.current) return

    refreshHierarchyInput(rootRef.current)

    const observer = new MutationObserver(() => refreshHierarchyInput(rootRef.current))

    observer.observe(rootRef.current, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [refreshHierarchyInput])

  return (
    <div
      ref={rootRef}
      className="w-full h-full"
    >
      {children}
    </div>
  )
}

export default HierarchyProvider
