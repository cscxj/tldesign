import { SVGContainer, TLShapeUtil } from '@tldesign/core'
import type { RectShape } from './RectShape'

export const RectComponent = TLShapeUtil.Component<RectShape, SVGSVGElement>(
  ({ shape }, ref) => {
    return (
      <SVGContainer ref={ref}>
        <rect
          width={shape.bounds.width}
          height={shape.bounds.height}
          stroke={shape.color}
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
          pointerEvents="all"
        />
      </SVGContainer>
    )
  }
)
