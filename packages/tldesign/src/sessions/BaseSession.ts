import { TlDesignApp } from '@/TlDesignApp'
import { SessionType, TlDesignCommand, TlDesignPatch } from '@/types'

export abstract class BaseSession {
  abstract type: SessionType
  constructor(public app: TlDesignApp) {}
  abstract start: () => TlDesignPatch | undefined
  abstract update: () => TlDesignPatch | undefined
  abstract complete: () => TlDesignPatch | TlDesignCommand | undefined
  abstract cancel: () => TlDesignPatch | undefined
}
