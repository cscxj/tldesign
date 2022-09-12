export const DEFAULT_EVENT = (e: React.BaseSyntheticEvent) => {
  if (e.dead) return
  else e.dead = true
}
