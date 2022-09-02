import { useBoundsHandleEvents } from '@/hooks/useBoundsHandleEvents'
import { TLBounds } from '@/types'

interface RotateHandleProps {
  bounds: TLBounds
  size: number
}

export const RotateHandle = ({ bounds }: RotateHandleProps) => {
  const events = useBoundsHandleEvents('rotate')
  return (
    <div
      className="tl-rotate-handle"
      style={{
        transform: `translateY(-${bounds.height / 2 + 20}px)`
      }}
      {...events}
    >
      <svg width="24" height="24" fill="#757575">
        <g fill="none">
          <circle stroke="#CCD1DA" fill="#FFF" cx="12" cy="12" r="11.5" />
          <path
            d="M16.242 12.012a4.25 4.25 0 00-5.944-4.158L9.696 6.48a5.75 5.75 0 018.048 5.532h1.263l-2.01 3.002-2.008-3.002h1.253zm-8.484-.004a4.25 4.25 0 005.943 3.638l.6 1.375a5.75 5.75 0 01-8.046-5.013H5.023L7.02 9.004l1.997 3.004h-1.26z"
            fill="#000"
          />
        </g>
      </svg>
    </div>
  )
}
