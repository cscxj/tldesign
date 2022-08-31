import { TLScaleHandle } from '@/types'
import { TLBounds } from '@/types'
import { Container } from '../Container'
import { SVGContainer } from '../'
import { ScaleHandle } from './ScaleHandle'
import { useBoundsEvents } from '@/hooks/useBoundsEvents'
import { RotateHandle } from './RotateHandle'

interface BoundsProps {
  bounds: TLBounds
}

export const Bounds = ({ bounds }: BoundsProps) => {
  const events = useBoundsEvents()
  return (
    <Container bounds={bounds}>
      <SVGContainer {...events}>
        {Object.values(TLScaleHandle)
          .filter((value) => !isNaN(Number(value)))
          .map((value) => (
            <ScaleHandle
              key={`scale-handle-${value}`}
              size={10}
              value={value as TLScaleHandle}
              bounds={bounds}
            ></ScaleHandle>
          ))}
        <RotateHandle bounds={bounds} size={10}></RotateHandle>
      </SVGContainer>
    </Container>
  )
}
