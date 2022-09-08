import { useRendererContext } from '@/hooks/useRendererContext'
import { useSelection } from '@/hooks/useSelection'
import { useShapeTree } from '@/hooks/useShapeTree'
import { TLPage, TLPageState } from '@/types'
import { Bounds } from '../Bounds'
import { BoundsBg } from '../Bounds/BoundsBg'
import { ShapeIndicator } from '../ShapeIndicator'
import { ShapeNode } from '../ShapeNode'

interface PageProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Page = ({ page, pageState }: PageProps) => {
  const { shapeUtils } = useRendererContext()
  const shapeTree = useShapeTree(page, pageState)
  const { bounds } = useSelection(page, pageState, shapeUtils)

  const { hoveredId, selectedIds } = pageState
  const selectShapes = selectedIds.map((id) => page.shapes[id])

  return (
    <>
      {bounds && <BoundsBg bounds={bounds} />}
      {shapeTree.map((node) => (
        <ShapeNode key={node.shape.id} utils={shapeUtils} {...node}></ShapeNode>
      ))}
      {selectShapes.map((shape) => (
        <ShapeIndicator shape={shape} key={'selected_' + shape.id} />
      ))}
      {hoveredId && <ShapeIndicator shape={page.shapes[hoveredId]} />}
      {bounds && <Bounds bounds={bounds} />}
    </>
  )
}
