import { useBoundsEvents } from '@/hooks/useBoundsEvents'
import { TLBounds } from '@/types'
import { Container } from '../Container'
import { SVGContainer } from '../SvgContainer'

/**
 * BoundsBg用于监听Bounds事件，为了在选择的图形太大时，能选择到中间小的图形，需要把该组件放在所有图形下面
 */

interface BoundsBgProps {
  bounds: TLBounds
}

export const BoundsBg = ({ bounds }: BoundsBgProps) => {
  const events = useBoundsEvents()

  return (
    <Container bounds={bounds}>
      <SVGContainer>
        <rect
          className="tl-bounds-bg"
          width={bounds.width}
          height={bounds.height}
          {...events}
        ></rect>
      </SVGContainer>
    </Container>
  )
}
