import { TEXT_SHAPE_PADDING } from '@/constance'
import { TextShape } from '@/types'
import { CSSProperties, styled } from '@stitches/react'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  pointerEvents: 'all'
})

export const TextComponent = TLShapeUtil.Component<TextShape, HTMLDivElement>(
  ({ shape, events, isEditing, onShapeChange }, ref) => {
    const textStyle = getTextStyle(shape)

    const handleChange = React.useCallback((e: ContentEditableEvent) => {
      const newText = e.target.value
      // 如果是已旋转的文本，修改文本会导致位置偏移

      onShapeChange?.({
        id: shape.id,
        text: newText
      })
    }, [])

    return (
      <HtmlContainer ref={ref} {...events}>
        <Wrapper>
          <ContentEditable
            html={shape.text}
            disabled={!isEditing}
            tagName="div"
            onChange={handleChange}
            style={textStyle}
          ></ContentEditable>
        </Wrapper>
      </HtmlContainer>
    )
  }
)

export function getTextStyle({
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
}: TextShape): CSSProperties {
  return {
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
    textShadow: textShadow ?? 'none',
    padding: `${TEXT_SHAPE_PADDING}px`,
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    outline: 'none'
  }
}
