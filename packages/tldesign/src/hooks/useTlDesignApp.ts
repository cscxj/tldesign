import { TlDesignApp } from '@/TlDesignApp'
import React from 'react'

export const TlDesignContext = React.createContext<TlDesignApp>(
  {} as TlDesignApp
)

export function useTlDesignApp() {
  const context = React.useContext(TlDesignContext)
  return context
}
