import { ScrollBar } from './scrollbar'
import { Layer } from 'holst'
import { ScrollBarDesign } from './scrollbar-design'
import { HScrollbarDesign } from './h-scrollbar-design'

export class HScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'h'

  getScrollBarDesign (layer: Layer): ScrollBarDesign {
    return new HScrollbarDesign(this.value, this.minValue, this.maxValue, this.containerSize, this.splitSize, this.style, layer)
  }
}
