import { useBoundsHandleEvents } from '@/hooks/useBoundsHandleEvents'
import { TLBounds } from '@/types'

interface RotateHandleProps {
  bounds: TLBounds
  size: number
}

export const RotateHandle = ({ bounds, size }: RotateHandleProps) => {
  const events = useBoundsHandleEvents('rotate')
  return (
    <g cursor="grab" opacity={1}>
      <circle
        className="tl-rotate-handle"
        aria-label="rotate handle"
        cx={bounds.width / 2}
        cy={size * -2}
        r={size / 2}
        pointerEvents="all"
        {...events}
      />
    </g>
  )
}
