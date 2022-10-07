import { Layer } from 'holst'

export interface IControl {
  create (layer: Layer): void
}
