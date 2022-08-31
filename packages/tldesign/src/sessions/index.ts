import { SessionType } from '@/types'
import { BrushSession } from './BrushSession/BrushSession'
import { TranslateSession } from './TranslateSession/TranslateSession'

export type TDSession = BrushSession | TranslateSession

interface SessionsMap {
  [SessionType.Brush]: typeof BrushSession
  [SessionType.Translate]: typeof TranslateSession
}

const sessions: SessionsMap = {
  [SessionType.Brush]: BrushSession,
  [SessionType.Translate]: TranslateSession
}

export function getSession<T extends SessionType>(type: T) {
  return sessions[type]
}
