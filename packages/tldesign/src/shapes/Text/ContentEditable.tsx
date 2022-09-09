import React from 'react'

export interface ContentEditableChangeEvent
  extends Omit<React.ChangeEvent, 'target'> {
  target: {
    value: string
  }
}

export interface ContentEditableProps<
  T extends keyof HTMLElementTagNameMap = 'div'
> extends Omit<
    React.HTMLProps<HTMLElementTagNameMap[T]>,
    'children' | 'onChange'
  > {
  /**
   * 编辑内容
   */
  html?: string
  /**
   * html标签
   */
  tagName?: T
  /**
   * ref
   */
  innerRef?: React.MutableRefObject<HTMLElementTagNameMap[T] | undefined>
  /**
   * 是否禁用
   */
  disabled?: boolean

  onChange?: (event: ContentEditableChangeEvent) => void
}

export const ContentEditable = ({
  html,
  tagName,
  innerRef,
  disabled,
  onChange,
  ...rest
}: ContentEditableProps) => {
  const lastHtml = React.useRef(html)

  return React.useMemo(() => {
    const emitChange = (e: React.ChangeEvent) => {
      const html = e.target.innerHTML
      if (onChange && html !== lastHtml.current) {
        const event: ContentEditableChangeEvent = {
          ...e,
          target: {
            value: html
          }
        }
        onChange(event)
      }
      lastHtml.current = html
    }

    return React.createElement(tagName || 'div', {
      ...rest,
      ref: innerRef,
      contentEditable: !disabled,
      onInput: emitChange,
      onBlur: rest.onBlur || emitChange,
      onKeyUp: rest.onKeyUp || emitChange,
      onKeyDown: rest.onKeyDown || emitChange,
      dangerouslySetInnerHTML: { __html: lastHtml.current }
    })
  }, [tagName, disabled])
}
