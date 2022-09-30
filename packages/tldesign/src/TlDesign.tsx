import { ThemeProvider } from 'styled-components'
import React from 'react'
import { TlDesignContext } from './hooks/useTlDesignApp'
import { TlLayout } from './layout'
import { TlDesignApp } from './TlDesignApp'
import { DEFAULT_THEME } from './constance'
import { TlEditor } from './TlEditor'

export function TlDesign() {
  const [app] = React.useState(() => new TlDesignApp())

  const state = app.useStore()

  return (
    <TlDesignContext.Provider value={app}>
      <ThemeProvider theme={DEFAULT_THEME}>
        <TlLayout
          header={app.appState.status}
          sidebar={'sidebar'}
          toolsPanel={'toolsPanel'}
        >
          <TlEditor></TlEditor>
        </TlLayout>
      </ThemeProvider>
    </TlDesignContext.Provider>
  )
}
