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
            width={shape.size[0]}
            height={shape.size[1]}
            src={shape.assetId}
            draggable={false}
          />
        </Wrapper>
      </HtmlContainer>
    )
  }
)
