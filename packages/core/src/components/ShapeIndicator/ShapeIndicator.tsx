import { useRendererContext } from '@/hooks/useRendererContext'
import { TLShape } from '@/types'
import { Utils } from '@/utils'
import { Container } from '../Container'

interface ShapeIndicatorProps {
  shape: TLShape
  zoom: number
}

export const ShapeIndicator = ({ shape, zoom }: ShapeIndicatorProps) => {
  const { shapeUtils } = useRendererContext()
  const util = shapeUtils[shape.type]
  const bounds = Utils.getZoomBounds(util.getBounds(shape), zoom)

  const { width, height } = bounds
  return (
    <Container bounds={bounds}>
      <svg width="100%" height="100%">
        <g className="tl-centered-g" fill="transparent">
          <rect
            className="tl-indicator"
            x={0}
            y={0}
            width={Math.max(1, width)}
            height={Math.max(1, height)}
          ></rect>
        </g>
      </svg>
    </Container>
  )
}
