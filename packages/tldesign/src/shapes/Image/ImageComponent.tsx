import { ImageShape } from '@/types'
import { styled } from '@stitches/react'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'

const Wrapper = styled('div', {
  pointerEvents: 'all',
  width: '100%',
  height: '100%',
  position: 'relative',

  img: {
    userSelect: 'none'
  }
})

export const ImageComponent = TLShapeUtil.Component<ImageShape, HTMLDivElement>(
  ({ shape, events }, ref) => {
    return (
      <HtmlContainer ref={ref} {...events}>
        <Wrapper>
          <img
            width={shape.bounds.width}
            height={shape.bounds.height}
            src={shape.assetId}
          />
        </Wrapper>
      </HtmlContainer>
    )
  }
)
