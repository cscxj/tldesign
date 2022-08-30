import { TLScaleHandle } from '@/constance'
import { TLBounds } from '@/types'
import { Container } from '../Container'
import { SVGContainer } from '../'
import { ScaleHandle } from './ScaleHandle'
import { useBoundsEvents } from '@/hooks/useBoundsEvents'

interface BoundsProps {
  bounds: TLBounds
}

export const Bounds = ({ bounds }: BoundsProps) => {
  const events = useBoundsEvents()
  return (
    <Container bounds={bounds}>
      <SVGContainer {...events}>
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
