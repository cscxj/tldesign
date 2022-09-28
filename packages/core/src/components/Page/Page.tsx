import { useRendererContext } from '@/hooks/useRendererContext'
import { useShapeTree } from '@/hooks/useShapeTree'
import { TLPage, TLPageState } from '@/types'
import { ShapeNode } from '../ShapeNode'

interface PageProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Page = ({ page, pageState }: PageProps) => {
  const { shapeUtils } = useRendererContext()
  const shapeTree = useShapeTree(page, pageState)

  return (
    <>
      {shapeTree.map((node) => (
        <ShapeNode key={node.shape.id} utils={shapeUtils} {...node}></ShapeNode>
      ))}
    </>
  )
}
