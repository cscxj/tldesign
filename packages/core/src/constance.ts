export const DIR_LEFT = 0b0001
export const DIR_RIGHT = 0b0010
export const DIR_TOP = 0b0100
export const DIR_BOTTOM = 0b1000

export const TLScaleHandle = {
  TopLeft: DIR_TOP | DIR_LEFT,
  Top: DIR_TOP,
  TopRight: DIR_TOP | DIR_RIGHT,
  Left: DIR_LEFT,
  Right: DIR_RIGHT,
  BottomLeft: DIR_BOTTOM | DIR_LEFT,
  Bottom: DIR_BOTTOM,
  BottomRight: DIR_BOTTOM | DIR_RIGHT
}
