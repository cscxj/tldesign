import { ExceptFirst, SessionType } from '@/types'
import { BrushSession } from './BrushSession/BrushSession'
import { RotateSession } from './RotateSession/RotateSession'
import { ScaleSession } from './ScaleSession/ScaleSession'
import { TranslateSession } from './TranslateSession/TranslateSession'

export type TDSession =
  | BrushSession
  | TranslateSession
  | RotateSession
  | ScaleSession

interface SessionsMap {
  [SessionType.Brush]: typeof BrushSession
  [SessionType.Translate]: typeof TranslateSession
  [SessionType.Rotate]: typeof RotateSession
  [SessionType.Scale]: typeof ScaleSession
}

const sessions: SessionsMap = {
  [SessionType.Brush]: BrushSession,
  [SessionType.Translate]: TranslateSession,
  [SessionType.Rotate]: RotateSession,
  [SessionType.Scale]: ScaleSession
}

export function getSession<T extends SessionType>(type: T) {
  return sessions[type]
}

export type SessionOfType<K extends SessionType> = SessionsMap[K]

export type SessionArgsOfType<K extends SessionType> = ExceptFirst<
  ConstructorParameters<SessionOfType<K>>
>
