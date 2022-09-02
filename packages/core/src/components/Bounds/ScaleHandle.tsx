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
  const rx = bounds.width / 2
  const ry = bounds.height / 2
  const halfSize = size / 2
  let width = size
  let height = size
  let x = rx - halfSize
  let y = ry - halfSize
  let r = halfSize

  if (value & TLScaleHandle.Top) {
    y -= ry
  }
  if (value & TLScaleHandle.Bottom) {
    y += ry
  }
  if (value & TLScaleHandle.Left) {
    x -= rx
  }
  if (value & TLScaleHandle.Right) {
    x += rx
  }
  if (!(value & (TLScaleHandle.Top | TLScaleHandle.Bottom))) {
    height *= 2
    width /= 2
    y -= halfSize
    x += halfSize / 2
    r /= 2
  }
  if (!(value & (TLScaleHandle.Left | TLScaleHandle.Right))) {
    width *= 2
    height /= 2
    x -= halfSize
    y += halfSize / 2
    r /= 2
  }

  const events = useBoundsHandleEvents(value)
  return (
    <g>
      <rect
        className="tl-scale-handle"
        x={x}
        y={y}
        rx={r}
        ry={r}
        width={width}
        height={height}
        pointerEvents="all"
        {...events}
      ></rect>
    </g>
  )
}
