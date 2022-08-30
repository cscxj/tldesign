import { TextShape } from '@/types'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'

export const TextComponent = TLShapeUtil.Component<TextShape, HTMLDivElement>(
  ({ shape, events }, ref) => {
    return (
      <HtmlContainer ref={ref} {...events}>
        <div
          style={{
            width: `${shape.bounds.width}px`,
            height: `${shape.bounds.height}px`
          }}
        >
          <span>{shape.text}</span>
        </div>
      </HtmlContainer>
    )
  }
)
