import { useRendererContext } from '@/hooks/useRendererContext'
import { TLShape } from '@/types'
import { Container } from '../Container'

interface ShapeIndicatorProps {
  shape: TLShape
}

export const ShapeIndicator = ({ shape }: ShapeIndicatorProps) => {
  const { shapeUtils } = useRendererContext()
  const util = shapeUtils[shape.type]
  const bounds = util.getBounds(shape)

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
