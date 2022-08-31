import { SessionType } from '@/types'
import { BrushSession } from './BrushSession/BrushSession'

interface SessionsMap {
  [SessionType.Brush]: typeof BrushSession
}

const sessions: SessionsMap = {
  [SessionType.Brush]: BrushSession
}

export function getSession<T extends SessionType>(type: T) {
  return sessions[type]
}
