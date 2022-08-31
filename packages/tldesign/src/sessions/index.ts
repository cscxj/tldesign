import { SessionType } from '@/types'
import { BrushSession } from './BrushSession/BrushSession'
import { RotateSession } from './RotateSession/RotateSession'
import { TranslateSession } from './TranslateSession/TranslateSession'

export type TDSession = BrushSession | TranslateSession | RotateSession

interface SessionsMap {
  [SessionType.Brush]: typeof BrushSession
  [SessionType.Translate]: typeof TranslateSession
  [SessionType.Rotate]: typeof RotateSession
}

const sessions: SessionsMap = {
  [SessionType.Brush]: BrushSession,
  [SessionType.Translate]: TranslateSession,
  [SessionType.Rotate]: RotateSession
}

export function getSession<T extends SessionType>(type: T) {
  return sessions[type]
}
