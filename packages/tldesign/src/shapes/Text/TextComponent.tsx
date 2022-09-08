import { TextShape } from '@/types'
import { styled } from '@stitches/react'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'
import React from 'react'

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  pointerEvents: 'all'
})

const TextArea = styled('textarea', {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  border: 'none',
  outline: 0,

  color: 'inherit',
  backgroundColor: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontStyle: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  textDecoration: 'inherit',
  writingMode: 'inherit',
  textAlign: 'inherit',
  verticalAlign: 'inherit',
  textShadow: 'inherit',

  overflow: 'hidden',
  backfaceVisibility: 'hidden',
  display: 'inline-block',
  pointerEvents: 'all',
  background: 'transparent',
  userSelect: 'text',
  WebkitUserSelect: 'text',
  '&:focus': {
    outline: 'none',
    border: 'none'
  }
})

export const TextComponent = TLShapeUtil.Component<TextShape, HTMLDivElement>(
  ({ shape, events, isEditing, onShapeChange }, ref) => {
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

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.currentTarget.value
        // todo
      },
      []
    )

    return (
      <HtmlContainer ref={ref} {...events}>
        <Wrapper>
          <div style={textStyle}>
            {isEditing ? (
              <TextArea onChange={handleChange} defaultValue={shape.text} />
            ) : (
              shape.text
            )}
          </div>
        </Wrapper>
      </HtmlContainer>
    )
  }
)
