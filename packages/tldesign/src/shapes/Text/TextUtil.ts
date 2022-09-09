import { TDShapeType, TextShape } from '@/types'
import { Point, TLBounds } from '@tldesign/core'
import { TDShapeUtil } from '../TDShapeUtil'
import { getTextStyle, TextComponent } from './TextComponent'
import Vec from '@tldesign/vec'
import { TEXT_SHAPE_PADDING } from '@/constance'

export class TextUtil extends TDShapeUtil<TextShape> {
  type = TDShapeType.Text

  Component = TextComponent

  getBounds(shape: TextShape): TLBounds {
    const { point, width, rotation } = shape
    const [minX, minY] = point
    const height = getTextHeight(shape)
    const [maxX, maxY] = Vec.add(point, [width, height])

    return {
      minX,
      minY,
      maxX,
      maxY,
      width,
      height,
      rotation
    }
  }

  getScaleMutation(
    initialShape: TextShape,
    _: TLBounds,
    [sw, sh]: Point
  ): Partial<TextShape> {
    const fontSize = initialShape.fontSize * sh
    const minWidth = fontSize + 2 * TEXT_SHAPE_PADDING
    return {
      width: Math.max(initialShape.width * sw, minWidth),
      fontSize
    }
  }
}

/**
 * 获取测量大小的元素
 * @returns
 */
function getMeasurementDiv() {
  document.getElementById('__textLabelMeasure')?.remove()

  const pre = document.createElement('pre')
  pre.id = '__textLabelMeasure'

  Object.assign(pre.style, {
    whiteSpace: 'pre-wrap',
    width: 'auto',
    boxSizing: 'border-box',
    margin: '0px',
    opacity: '0',
    position: 'absolute',
    top: '-500px',
    left: '0px',
    zIndex: '9999',
    pointerEvents: 'none',
    userSelect: 'none',
    alignmentBaseline: 'mathematical',
    dominantBaseline: 'mathematical'
  } as React.CSSProperties)

  pre.tabIndex = -1

  document.body.appendChild(pre)
  return pre
}

function getTextHeight(shape: TextShape): number {
  const mElm = getMeasurementDiv()
  mElm.textContent = shape.text
  Object.assign(mElm.style, {
    width: `${shape.width}px`,
    ...getTextStyle(shape)
  })
  return mElm.offsetHeight
}
