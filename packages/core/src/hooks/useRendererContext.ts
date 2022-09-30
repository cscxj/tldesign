import { Inputs } from '@/inputs'
import { TLShapeUtilsMap } from '@/TLShapeUtil'
import { TLCallbacks, TLShape } from '@/types'
import React from 'react'

export interface IRendererContext {
  id?: string
  callbacks: Partial<TLCallbacks<TLShape>>
  shapeUtils: TLShapeUtilsMap
  inputs: Inputs
}

export const RendererContext = React.createContext({} as IRendererContext)

export function useRendererContext() {
  return React.useContext(RendererContext)
}
