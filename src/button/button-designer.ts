import { Anchor, IRect, Layer, Point, Shape, TextBlock } from 'holst'
import { Button } from './button'

export class ButtonDesigner {
  #button: Button
  #buttonShape: Shape | null
  #titleTextBlock: TextBlock | null
  layer: Layer | null

  constructor (button: Button) {
    this.#button = button
    this.layer = null
    this.#buttonShape = null
    this.#titleTextBlock = null
  }

  create () {

    const button = Shape.create({ stroke: '#333', fill: '#fff' }).roundRect(this.#button.bounds, 8)
    const anchor = Anchor.create(button)
    const title = TextBlock.create(this.#button.text + '\n', {})
    title.setAnchor(anchor)

    title.size = this.#button.bounds
    title.alignment = 'center'
    title.verticalAlignment = 'center'
    title.baseline = 'middle'
    title.target = new Point(0, 0)
    if (this.#button.autosize) {
      const width = title.width
      if (width > this.#button.bounds.width) {
        (button.figures.first() as IRect).width = width + 16
        title.size.width = width + 16
      }
    }

    if (this.layer) {
      this.layer.addShape(button)
      this.layer.addTextBlock(title)
    }

    this.#buttonShape = button
    this.#titleTextBlock = title
    return { button, title }
  }

  update () {
    if (!this.#buttonShape || !this.#titleTextBlock) return

    if (this.#button.hidden) {
      this.#buttonShape.hidden = true
      this.#titleTextBlock.hidden = true
      return
    }

    this.#titleTextBlock.text = this.#button.text
    const rect = this.#buttonShape.figures.first() as IRect
    rect.x = this.#button.x
    rect.y = this.#button.y
    rect.width = this.#button.width
    rect.height = this.#button.height
    this.#buttonShape.hidden = false
    this.#titleTextBlock.hidden = false
  }
}