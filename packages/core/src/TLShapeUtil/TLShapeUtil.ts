import type {
  TLBounds,
  TLComponentProps,
  TLForwardedRef,
  TLShape
} from '@/types'
import React from 'react'

export abstract class TLShapeUtil<S extends TLShape> {
  abstract Component: React.ForwardRefExoticComponent<TLComponentProps<S>>

  abstract getBounds(shape: S): TLBounds

  /* --------------------- Static --------------------- */

  static Component = <S extends TLShape, E>(
    component: (
      props: TLComponentProps<S>,
      ref: TLForwardedRef<E>
    ) => React.ReactElement
  ) => {
    return React.forwardRef(component)
  }
}
