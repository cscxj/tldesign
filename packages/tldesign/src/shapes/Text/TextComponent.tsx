import { TEXT_SHAPE_PADDING } from '@/constance'
import { TextShape } from '@/types'
import { CSSProperties, styled } from '@stitches/react'
import { HtmlContainer, TLShapeUtil, Utils } from '@tldesign/core'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { Text } from '..'
import Vec from '@tldesign/vec'

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  pointerEvents: 'all'
})

export const TextComponent = TLShapeUtil.Component<TextShape, HTMLDivElement>(
  ({ shape, events, isEditing, onShapeChange }, ref) => {
    const textStyle = getTextStyle(shape)

    const handleChange = (e: ContentEditableEvent) => {
      const newText = e.target.value

      // 计算旋转之后的偏移
      const currentBounds = Text.getBounds(shape)
      const currentCenter = Utils.getBoundsCenter(currentBounds)
      const currentRotatedPoint = Vec.rotWith(
        shape.point,
        currentCenter,
        shape.rotation
      )

      const nextBounds = Text.getBounds({
        ...shape,
        text: newText
      })
      const nextCenter = Utils.getBoundsCenter(nextBounds)
      const nextRotatedPoint = Vec.rotWith(
        shape.point,
        nextCenter,
        shape.rotation
      )

      const offset = Vec.sub(nextRotatedPoint, currentRotatedPoint)

      onShapeChange?.({
        id: shape.id,
        text: newText,
        point: Vec.sub(shape.point, offset)
      })
    }

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
