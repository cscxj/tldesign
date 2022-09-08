import { Inputs } from '@/inputs'
import { TLShapeUtilsMap } from '@/TLShapeUtil'
import { TLEvents, TLShape } from '@/types'
import React from 'react'

export interface IRendererContext {
  id?: string
  events: Partial<TLEvents<TLShape>>
  shapeUtils: TLShapeUtilsMap
  inputs: Inputs
}

export const RendererContext = React.createContext({} as IRendererContext)

export function useRendererContext() {
  return React.useContext(RendererContext)
}
