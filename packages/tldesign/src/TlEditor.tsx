import { Editor } from '@tldesign/core'
import styled from 'styled-components'
import { useTlDesignApp } from './hooks/useTlDesignApp'
import { shapeUtils } from './shapes'

const StyledEditor = styled.div`
  position: relative;
  background-color: #e7e8f1;
  width: 100%;
  height: 100%;
  overflow: auto;
`

export function TlEditor() {
  const app = useTlDesignApp()
  const { page, pageState } = app

  return (
    <StyledEditor>
      <Editor
        shapeUtils={shapeUtils}
        page={page}
        pageState={pageState}
        // pointer
        onPointerDown={app.onPointerDown}
        onPointerUp={app.onPointerUp}
        onPointerMove={app.onPointerMove}
        // shape
        onPointShape={app.onPointShape}
        onHoverShape={app.onHoverShape}
        onUnHoverShape={app.onUnHoverShape}
        onDoubleClickShape={app.onDoubleClickShape}
        // bounds
        onPointBounds={app.onPointBounds}
        onReleaseBounds={app.onReleaseBounds}
        // bounds handle
        onPointBoundsHandle={app.onPointBoundsHandle}
        // canvas
        onPointCanvas={app.onPointCanvas}
        // page
        onPointPage={app.onPointPage}
        // other
        onShapeChange={app.onShapeChange}
        onResize={app.zoomToFill}
      ></Editor>
    </StyledEditor>
  )
}
