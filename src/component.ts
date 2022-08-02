import { Scene } from 'holst'

export interface IComponent {
  create (scene: Scene): void
}
