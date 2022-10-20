import 'antd/dist/antd.css'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import React from 'react'
import { TlDesignContext } from './hooks/useTlDesignApp'
import { TlLayout } from './layout'
import { TlDesignApp } from './TlDesignApp'
import { DEFAULT_THEME } from './constance'
import { TlEditor } from './TlEditor'
import { Toolbar } from './components/Toolbar'
import { Sidebar } from './components/Sidebar'
import { SidePanel } from './components/SidePanel'

const ToolbarWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
  }

  ::-webkit-scrollbar-corner {
      display: none;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: rgba(0,0,0,.3);
  }

  ::-webkit-scrollbar-track {
      background-color: transparent;
  }
`

export function TlDesign() {
  const [app] = React.useState(() => new TlDesignApp())

  const state = app.useStore()

  return (
    <TlDesignContext.Provider value={app}>
      <ThemeProvider theme={DEFAULT_THEME}>
        <TlLayout
          header={app.appState.status}
          sidebar={<Sidebar></Sidebar>}
          sidePanel={<SidePanel></SidePanel>}
          toolsPanel={'toolsPanel'}
        >
          <TlEditor></TlEditor>
          <ToolbarWrapper>
            <Toolbar></Toolbar>
          </ToolbarWrapper>
        </TlLayout>
        <GlobalStyles></GlobalStyles>
      </ThemeProvider>
    </TlDesignContext.Provider>
  )
}
