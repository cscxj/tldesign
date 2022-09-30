import { usePageEvents } from '@/hooks/usePageEvents'
import { useRendererContext } from '@/hooks/useRendererContext'
import { useSelection } from '@/hooks/useSelection'
import { useShapeTree } from '@/hooks/useShapeTree'
import { TLPage, TLPageState } from '@/types'
import { Bounds } from '../Bounds'
import { BoundsBg } from '../Bounds/BoundsBg'
import { Brush } from '../Brush'
import { ShapeIndicator } from '../ShapeIndicator'
import { ShapeNode } from '../ShapeNode'

interface PageProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Page = ({ page, pageState }: PageProps) => {
  const width = page.size[0] * pageState.camera.zoom
  const height = page.size[1] * pageState.camera.zoom
  const events = usePageEvents()

  const { shapeUtils } = useRendererContext()
  const { bounds } = useSelection(page, pageState, shapeUtils)

  const { hoveredId, selectedIds } = pageState
  const selectShapes = selectedIds.map((id) => page.shapes[id])

  const shapeTree = useShapeTree(page, pageState)

  return (
    <div
      className="tl-page"
      style={{ width: `${width}px`, height: `${height}px` }}
      {...events}
    >
      {bounds && <BoundsBg bounds={bounds} />}
      <div className="tl-page-content">
        {shapeTree.map((node) => (
          <ShapeNode
            key={node.shape.id}
            utils={shapeUtils}
            {...node}
          ></ShapeNode>
        ))}
      </div>
      {selectShapes.map((shape) => (
        <ShapeIndicator shape={shape} key={'selected_' + shape.id} />
      ))}
      {hoveredId && <ShapeIndicator shape={page.shapes[hoveredId]} />}
      {bounds && <Bounds bounds={bounds} />}
      {pageState.brush && <Brush brush={pageState.brush} />}
    </div>
  )
}
