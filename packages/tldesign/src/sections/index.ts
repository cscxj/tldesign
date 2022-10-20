import { BaseSection } from './BaseSection'
import { ElementSection } from './ElementSection'
import { TextSection } from './TextSection'

const elementSection = new ElementSection()
const textSection = new TextSection()

export const defaultSections: BaseSection[] = [elementSection, textSection]
