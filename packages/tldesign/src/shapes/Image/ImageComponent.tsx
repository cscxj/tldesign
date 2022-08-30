import { ImageShape } from '@/types'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'

export const ImageComponent = TLShapeUtil.Component<ImageShape, HTMLDivElement>(
  ({ shape, events }, ref) => {
    return (
      <HtmlContainer ref={ref} {...events}>
        <img
          width={shape.bounds.width}
          height={shape.bounds.height}
          src={shape.assetId}
        />
      </HtmlContainer>
    )
  }
)
