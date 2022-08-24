import { DIR_BOTTOM, DIR_LEFT, DIR_RIGHT, DIR_TOP } from '@/constance'
import { TLBounds } from '@/types'

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
  if (value & DIR_LEFT) {
    x = -size / 2
  } else if (value & DIR_RIGHT) {
    x = bounds.width - size / 2
  } else {
    x = bounds.width / 2 - size
    width = size * 2
  }
  if (value & DIR_TOP) {
    y = -size / 2
  } else if (value & DIR_BOTTOM) {
    y = bounds.height - size / 2
  } else {
    y = bounds.height / 2 - size
    height = size * 2
  }
  return (
    <g>
      <rect x={x} y={y} width={width} height={height}></rect>
    </g>
  )
}
