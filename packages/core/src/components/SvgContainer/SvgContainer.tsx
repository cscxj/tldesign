import * as React from 'react'

interface SvgContainerProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode
  className?: string
}

export const SVGContainer = React.forwardRef<SVGSVGElement, SvgContainerProps>(
  function SVGContainer({ id, className = '', children, ...rest }, ref) {
    return (
      <svg ref={ref} className={`tl-svg-container ${className}`} {...rest}>
        <g id={id} className="tl-centered-g">
          {children}
        </g>
      </svg>
    )
  }
)
