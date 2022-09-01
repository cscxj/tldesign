import { TLPage, TLPageState, TLShape } from '@tldesign/core'

// shapes

export enum TDShapeType {
  Image = 'image',
  Text = 'text'
}

export enum SessionType {
  Brush = 'brush',
  Translate = 'translate',
  Rotate = 'rotate'
}

export enum TDStatus {
  Idle = 'idle',
  PointingBounds = 'pointing_bounds',
  PointingCanvas = 'pointing_canvas',
  PointingRotateHandle = 'pointing_rotate_handle',
  PointingScaleHandle = 'pointing_bounds_handle',
  Brushing = 'brushing',
  Translating = 'translating',
  Rotating = 'rotating'
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
    status: TDStatus
  }
  document: TDDocument
}

export type Patch<T> = Partial<{ [P in keyof T]: Patch<T[P]> }>

export type TlDesignPatch = Patch<TDSnapshot>

export interface Command<T extends { [key: string]: any }> {
  id?: string
  before: Patch<T>
  after: Patch<T>
}

export type TlDesignCommand = Command<TDSnapshot>
