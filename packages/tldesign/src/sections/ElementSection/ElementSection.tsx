import { BaseSection } from '../BaseSection'
import { LayersIcon } from '@radix-ui/react-icons'

export class ElementSection extends BaseSection {
  name = 'element'

  Tab = () => (
    <div>
      <LayersIcon></LayersIcon>
      <div>素材</div>
    </div>
  )

  Panel = () => <div>素材</div>
}
