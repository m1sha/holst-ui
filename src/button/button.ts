import { IPoint, IRect, Layer, Rect } from 'holst';
import { IControl } from '../control'
import { ButtonBehavior } from './button-behavior';
import { ButtonDesigner } from './button-designer';

type OnButtonClick = () => void

export class Button implements IControl {
  #designer: ButtonDesigner
  #behavior: ButtonBehavior
  #text: string = 'Button'
  #rect: IRect
  #hidden: boolean = false
  autosize: boolean = false
  onClick: OnButtonClick | null = null


  constructor () {
    this.#rect = new Rect(0,0, 80, 24)
    this.#designer = new ButtonDesigner(this)
    this.#behavior = new ButtonBehavior(this)
  }

  create(layer: Layer): void {
    this.#designer.layer = layer
    const { button, title } = this.#designer.create()
    this.#behavior.create(button, title)
  }

  get text () {
    return this.#text
  }

  set text (value: string) {
    this.#text = value
    this.#designer.update()
  }

  get x () {
    return this.#rect.x
  }

  set x (value: number) {
    this.#rect.x = value
    this.#designer.update()
  }

  get y () {
    return this.#rect.y
  }

  set y (value: number) {
    this.#rect.y = value
    this.#designer.update()
  }

  get height () {
    return this.#rect.height
  }

  set height (value: number) {
    this.#rect.height = value
    this.#designer.update()
  }

  get width () {
    return this.#rect.width
  }

  set width (value: number) {
    this.#rect.width = value
    this.#designer.update()
  }

  get bounds () {
    return this.#rect
  }

  get hidden () {
    return this.#hidden
  }

  set hidden (value: boolean) {
    this.#hidden = value
    this.#designer.update()
  }

  setPosition (x: number, y: number): void
  setPosition ({ x, y }: IPoint): void
  setPosition (...args: Array<any>): void {
    if (args.length === 1) {
      this.#rect.x = args[0].x
      this.#rect.y = args[0].y
    }

    if (args.length === 2) {
      this.#rect.x = args[0]
      this.#rect.y = args[1]
    }

    this.#designer.update()
  }
}