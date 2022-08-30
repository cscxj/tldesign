import { TLShape } from '@/types'
import { Container } from '../Container'

interface ShapeIndicatorProps {
  shape: TLShape
}

export const ShapeIndicator = ({ shape }: ShapeIndicatorProps) => {
  const {
    bounds: { width, height }
  } = shape
  return (
    <Container bounds={shape.bounds}>
      <svg width="100%" height="100%">
        <g className="tl-centered-g" stroke="#ff0000" fill="transparent">
          <rect
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
