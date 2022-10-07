import { Shape, TextBlock } from 'holst'
import { Button } from './button'

export class ButtonBehavior {
  #button: Button
  constructor (button: Button) {
    this.#button = button
  }

  create (button: Shape, title: TextBlock) {
    button.on('hover', e => {
      if (this.#button.hidden) return
      e.cursor = 'pointer'
      button.style.fill = '#ddd'
    })

    button.on('leave', e => {
      if (this.#button.hidden) return
      e.cursor = 'default'
      button.style.fill = '#fff'
    })

    button.on('click', e => {
      if (this.#button.hidden) return
      if (this.#button.onClick) this.#button.onClick()
    })
  }
}