import { TLShapeUtilsMap } from '@/TLShapeUtil'
import { TLEvents } from '@/types'
import React from 'react'

export interface IRendererContext {
  id?: string
  events: Partial<TLEvents>
  shapeUtils: TLShapeUtilsMap
}

export const RendererContext = React.createContext({} as IRendererContext)

export function useRendererContext() {
  return React.useContext(RendererContext)
}
