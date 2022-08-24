import { TLScaleHandle } from '@/constance'
import { TLBounds } from '@/types'
import { Container } from '../Container'
import { SVGContainer } from '../'
import { ScaleHandle } from './ScaleHandle'

interface BoundsProps {
  bounds: TLBounds
}

export const Bounds = ({ bounds }: BoundsProps) => {
  return (
    <Container bounds={bounds}>
      <SVGContainer>
        {Object.values(TLScaleHandle).map((value) => (
          <ScaleHandle
            key={`scale-handle-${value}`}
            size={10}
            value={value}
            bounds={bounds}
          ></ScaleHandle>
        ))}
      </SVGContainer>
    </Container>
  )
}
