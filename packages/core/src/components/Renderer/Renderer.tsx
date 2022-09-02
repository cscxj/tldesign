import { IRendererContext, RendererContext } from '@/hooks/useRendererContext'
import { useTLTheme } from '@/hooks/useStyle'
import { Inputs } from '@/inputs'
import { TLShapeUtilsMap } from '@/TLShapeUtil'
import { TLEvents, TLPage, TLPageState, TLShape } from '@/types'
import { useState } from 'react'
import { Canvas } from '../Canvas'

export interface RendererProps<S extends TLShape> extends Partial<TLEvents> {
  id?: string
  shapeUtils: TLShapeUtilsMap<S>
  page: TLPage<S>
  pageState: TLPageState
}

export const Renderer = <S extends TLShape>({
  id,
  page,
  pageState,
  shapeUtils,
  ...rest
}: RendererProps<S>) => {
  useTLTheme()

  const [context] = useState<IRendererContext>({
    id,
    shapeUtils: shapeUtils as unknown as TLShapeUtilsMap<TLShape>,
    events: rest,
    inputs: new Inputs()
  })

  return (
    <RendererContext.Provider value={context}>
      <Canvas id={id} page={page} pageState={pageState}></Canvas>
    </RendererContext.Provider>
  )
}
