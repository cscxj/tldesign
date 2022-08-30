import { TLPage, TLPageState, TLShape } from '@tldesign/core'

// shapes

export enum TDShapeType {
  Image = 'image',
  Text = 'text'
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

type TDPage = TLPage<TDShape>

// document

export interface TDDocument {
  id: string
  name: string
  version: number
  pages: Record<string, TDPage>
  pageStates: Record<string, TLPageState>
}

// app state

export interface TDAppState {
  runtime: {
    currentPageId: string
  }
  document: TDDocument
}
