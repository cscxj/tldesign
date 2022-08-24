import { TLBounds } from '@/types'
import type { HTMLProps } from 'react'
import React from 'react'

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  bounds: TLBounds
}

export const Container = ({ children, bounds }: ContainerProps) => {
  const rPositioned = React.useRef<HTMLDivElement>(null)
  React.useLayoutEffect(() => {
    const el = rPositioned.current!
    const transform = `
        translate(
            calc(${bounds.x}px - var(--tl-padding)),
            calc(${bounds.y}px - var(--tl-padding))
        )
        rotate(${bounds.rotation}rad)
    `
    el.style.setProperty('transform', transform)
    el.style.setProperty(
      'width',
      `calc(${Math.floor(bounds.width)}px + (var(--tl-padding) * 2))`
    )
    el.style.setProperty(
      'height',
      `calc(${Math.floor(bounds.height)}px + (var(--tl-padding) * 2))`
    )
  }, [bounds])
  return (
    <div ref={rPositioned} className="tl-container">
      {children}
    </div>
  )
}
