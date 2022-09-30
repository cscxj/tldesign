import { IRendererContext, RendererContext } from '@/hooks/useRendererContext'
import { useTLTheme } from '@/hooks/useStyle'
import { Inputs } from '@/inputs'
import { TLShapeUtilsMap } from '@/TLShapeUtil'
import { TLCallbacks, TLPage, TLPageState, TLShape } from '@/types'
import { useState } from 'react'
import { Canvas } from '../Canvas'

interface EditorProps<S extends TLShape> extends Partial<TLCallbacks<S>> {
  id?: string
  shapeUtils: TLShapeUtilsMap<S>
  page: TLPage<S>
  pageState: TLPageState
}

export const Editor = <S extends TLShape>({
  id,
  page,
  pageState,
  shapeUtils,
  ...rest
}: EditorProps<S>) => {
  useTLTheme()

  const [context] = useState<IRendererContext>({
    id,
    shapeUtils: shapeUtils as unknown as TLShapeUtilsMap<TLShape>,
    callbacks: rest as unknown as TLCallbacks<TLShape>,
    inputs: new Inputs()
  })

  return (
    <RendererContext.Provider value={context}>
      <Canvas id={id} page={page} pageState={pageState}></Canvas>
    </RendererContext.Provider>
  )
}
