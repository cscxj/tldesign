import { useBoundsHandleEvents } from '@/hooks/useBoundsHandleEvents'
import { TLBounds, TLScaleHandle } from '@/types'

interface ScaleHandleProps {
  size: number
  bounds: TLBounds
  /**
   * 控制点的位置标识
   */
  value: number
}

export const ScaleHandle = ({ size, bounds, value }: ScaleHandleProps) => {
  let width = size
  let height = size
  let x = 0
  let y = 0
  if (value & TLScaleHandle.Left) {
    x = -size / 2
  } else if (value & TLScaleHandle.Right) {
    x = bounds.width - size / 2
  } else {
    x = bounds.width / 2 - size
    width = size * 2
  }
  if (value & TLScaleHandle.Top) {
    y = -size / 2
  } else if (value & TLScaleHandle.Bottom) {
    y = bounds.height - size / 2
  } else {
    y = bounds.height / 2 - size
    height = size * 2
  }
  const events = useBoundsHandleEvents(value)
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        pointerEvents="all"
        {...events}
      ></rect>
    </g>
  )
}
