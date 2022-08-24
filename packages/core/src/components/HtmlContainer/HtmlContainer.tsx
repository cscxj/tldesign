import React from 'react'

interface HTMLContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

export const HtmlContainer = React.forwardRef<
  HTMLDivElement,
  HTMLContainerProps
>(function HtmlContainer({ children, ...rest }, ref) {
  return (
    <div className="tl-html-container" ref={ref} {...rest}>
      <div className="tl-inner-div">{children}</div>
    </div>
  )
})
