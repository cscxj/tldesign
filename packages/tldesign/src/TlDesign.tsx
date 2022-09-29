import styled, { ThemeProvider } from 'styled-components'
import { Renderer } from '@tldesign/core'
import React from 'react'
import { TlDesignContext } from './hooks/useTlDesignApp'
import { TlLayout } from './layout'
import { shapeUtils } from './shapes'
import { TlDesignApp } from './TlDesignApp'
import { DEFAULT_THEME } from './constance'

const StyledWorkspace = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e7e8f1;
`

export function TlDesign() {
  const [app] = React.useState(() => new TlDesignApp())

  const state = app.useStore()

  const { document, appState } = state

  const page = document.pages[appState.currentPageId]
  const pageState = document.pageStates[page.id]

  return (
    <TlDesignContext.Provider value={app}>
      <ThemeProvider theme={DEFAULT_THEME}>
        <TlLayout
          header={app.appState.status}
          sidebar={'sidebar'}
          toolsPanel={'toolsPanel'}
        >
          <StyledWorkspace>
            <Renderer
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
              // other
              onShapeChange={app.onShapeChange}
            ></Renderer>
          </StyledWorkspace>
        </TlLayout>
      </ThemeProvider>
    </TlDesignContext.Provider>
  )
}
