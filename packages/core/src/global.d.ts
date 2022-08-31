export {}

declare module '@types/react' {
  interface BaseSyntheticEvent {
    dead?: boolean
  }
}
