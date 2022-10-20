import { BaseSection } from '../BaseSection'
import { TextIcon } from '@radix-ui/react-icons'

export class TextSection extends BaseSection {
  name = 'text'

  Tab = () => (
    <div>
      <TextIcon></TextIcon>
      <div>文本</div>
    </div>
  )

  Panel = () => <div>文本</div>
}
