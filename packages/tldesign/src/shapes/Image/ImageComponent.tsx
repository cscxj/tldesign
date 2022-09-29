import { ImageShape } from '@/types'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'
import styled from 'styled-components'

const Wrapper = styled.div`
  pointer-events: all;
  width: 100%;
  height: 100%;
  position: relative;

  img {
    user-select: none;
  }
`

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
