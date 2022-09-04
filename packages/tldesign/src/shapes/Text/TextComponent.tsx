import { TextShape } from '@/types'
import { styled } from '@stitches/react'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  pointerEvents: 'all'
})

export const TextComponent = TLShapeUtil.Component<TextShape, HTMLDivElement>(
  ({ shape, events }, ref) => {
    const {
      color,
      backgroundColor,
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      lineHeight,
      letterSpacing,
      textDecoration,
      writingMode,
      textAlign,
      verticalAlign,
      textShadow
    } = shape

    const textStyle: React.CSSProperties = {
      color,
      backgroundColor: backgroundColor ?? 'none',
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      lineHeight,
      letterSpacing,
      textDecoration,
      writingMode,
      textAlign,
      verticalAlign,
      textShadow: textShadow ?? 'none'
    }

    return (
      <HtmlContainer ref={ref} {...events}>
        <Wrapper>
          <div style={textStyle}>{shape.text}</div>
        </Wrapper>
      </HtmlContainer>
    )
  }
)
