import { SVGContainer, TLShapeUtil } from '@tldesign/core'
import type { RectShape } from './RectShape'

export const RectComponent = TLShapeUtil.Component<RectShape, SVGSVGElement>(
  ({ shape, events }, ref) => {
    return (
      <SVGContainer ref={ref} {...events}>
        <rect
          width={shape.size[0]}
          height={shape.size[1]}
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
