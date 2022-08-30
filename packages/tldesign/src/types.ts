import { TLPage, TLPageState, TLShape } from '@tldesign/core'

// shapes

export enum TDShapeType {
  Image = 'image',
  Text = 'text'
}

export enum Status {
  Idle = 'idle',
  PointingBounds = 'pointing_bounds'
}

export interface TDBaseShape extends TLShape {
  type: TDShapeType
}

export interface ImageShape extends TDBaseShape {
  type: TDShapeType.Image
  assetId: string
}

export interface TextShape extends TDBaseShape {
  type: TDShapeType.Text
  text: string
}

export type TDShape = ImageShape | TextShape

// page

export type TDPage = TLPage<TDShape>

// document

export interface TDDocument {
  id: string
  name: string
  version: number
  pages: Record<string, TDPage>
  pageStates: Record<string, TLPageState>
}

// app state

export interface TDSnapshot {
  appState: {
    currentPageId: string
    status: Status
  }
  document: TDDocument
}

export type Patch<T> = Partial<{ [P in keyof T]: Patch<T[P]> }>
