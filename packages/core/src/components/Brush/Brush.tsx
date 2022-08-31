import { TLBounds } from '@/types'
import { Container } from '../Container'
import { SVGContainer } from '../SvgContainer'

interface BrushProps {
  brush: TLBounds
}

export const Brush = ({ brush }: BrushProps) => {
  return (
    <Container bounds={brush}>
      <SVGContainer>
        <rect
          className="tl-brush"
          opacity={1}
          x={0}
          y={0}
          width={brush.width}
          height={brush.height}
        ></rect>
      </SVGContainer>
    </Container>
  )
}
