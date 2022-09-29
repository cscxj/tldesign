import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      link: string
      success: string
      warning: string
      error: string
    }

    fontSize: {
      large: string
      medium: string
      small: string
    }

    // padding or margin
    spacing: {
      large: string
      medium: string
      small: string
    }

    borderRadius: {
      base: string
      small: string
    }

    border: {
      base: string
    }
  }
}
